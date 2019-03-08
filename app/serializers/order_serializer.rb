# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_orders_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_total, :subtotal, :shipping, :total_line_items, :total_weight, :total_items, :roaster_name, :status, :order_date, :company_name

  def order_items
    self.object.order_items.map do |item|
      variant = item.product_variant
      product = variant.product
      {
        id: item.id,
        production_options: item.product_options,
        quantity: item.quantity,
        name: product.title,
        variant_id: item.product_variant_id,
        size: variant.custom_options["size"],
        unit_price: '%.2f' % (variant.price_in_cents.to_i/100.0),
        image: product.product_image_urls[0],
        notes: item.notes,
        total_price: '%.2f' % (variant.price_in_cents.to_i/100.0 * item.quantity),
      }
    end
  end

  def roaster_name
    self.object.wholesale_profile.roaster_profile.name
  end

  def subtotal
    '%.2f' % (self.object.order_items.sum { |oi| oi.product_variant.price_in_cents.to_f/100.0 * oi.quantity })
  end

  def total_line_items
    self.object.order_items.length
  end

  def shipping
    '%.2f' % (18.63)
  end

  def order_total
    '%.2f' % (self.object.order_items.sum { |oi| oi.product_variant.price_in_cents.to_f/100.0 * oi.quantity } + shipping.to_f)
  end

  def total_items
    self.object.order_items.sum { |oi| oi.quantity }
  end

  def total_weight
    self.object.order_items.sum { |oi| oi.product_variant.custom_options["size"].to_i * oi.quantity }
  end

  def order_date
    self.object.created_at
  end

  def company_name
    self.object.customer_profile.company_name
  end

  def terms
    self.object.wholesale_profile.terms
  end
end

class SingleOrderSerializer < OrderSerializer
  attributes :order_items, :terms
end
