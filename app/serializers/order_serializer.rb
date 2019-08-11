# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  easypost_shipment_id :string
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
  attributes :id, :order_total, :subtotal, :shipping, :total_line_items, :total_weight, :order_shipping_method,
  :total_items, :roaster_name, :status, :order_date, :company_name, :taxes, :estimated_roast_date

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
        total_price: '%.2f' % (variant.price_in_cents.to_i/100.0 * item.quantity)
      }
    end
  end
end

class SingleOrderSerializer < OrderSerializer
  attributes :order_items, :terms
end
