# == Schema Information
#
# Table name: carts
#
#  id                   :bigint(8)        not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  easypost_shipment_id :string
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_carts_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

class CartSerializer < ActiveModel::Serializer
  attributes :id, :cart_items, :total_price, :full_price, :total_line_items, :total_weight, :total_items, :roaster_name, :tax_rate

  def cart_items
    self.object.cart_items.map do |item|
      variant = item.product_variant
      product = variant.product
      price = variant.price_in_cents.to_i/100.0
      discount = self.object.wholesale_profile.cust_discount
      discounted_price = price
      if !discount.nil? && discount > 0
        discounted_price = price * (1 - discount/100.0)
      end
      {
        id: item.id,
        production_options: item.production_options,
        quantity: item.quantity,
        name: product.title,
        variant_id: item.product_variant_id,
        size: variant[:size],
        price: '%.2f' % price,
        discounted_price: '%.2f' % discounted_price,
        image: product.product_image_urls[0],
        product_type: product.product_type,
        shipping_weight: variant.shipping_weight
      }
    end
  end

  def roaster_name
    self.object.wholesale_profile.roaster_profile.name
  end

  def total_price
    cart_items.sum { |ci| ci[:discounted_price].to_f * ci[:quantity] }
  end
  
  def full_price
    cart_items.sum { |ci| ci[:price].to_f * ci[:quantity] }
  end

  def total_line_items
    cart_items.length
  end

  def total_items
    cart_items.sum { |ci| ci[:quantity] }
  end

end
