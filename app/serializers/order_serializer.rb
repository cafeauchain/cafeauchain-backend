# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  notes                :text
#  roast_date           :date
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
  :total_items, :roaster_name, :status, :order_date, :company_name, :taxes, :roast_date, :invoice_status, :notes,
  :full_total, :customer_discount, :customer_discount_amount, :customer_discount_applied, :invoice_discount, :invoice_details

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
        total_price: '%.2f' % (variant.price_in_cents.to_i/100.0 * item.quantity),
        packed: item[:packed]
      }
    end
  end

  def invoice_details
    {
      base_total: self.object.full_total.to_f.round(2),
      customer_discount_amount: self.object.customer_discount_amount.to_f.round(2),
      invoice_discount: self.object.invoice_discount.to_f.round(2),
      discounted_total: self.object.il_discount_total.to_f.round(2),
      shipping_amount: self.object.invoice.shipping.to_f.round(2),
      taxable: self.object.invoice.taxable.to_f.round(2),
      tax: self.object.taxes.to_f.round(2),
      order_total: self.object.order_total.to_f.round(2),
      invoice_fee: self.object.invoice_fee.to_f.round(2),
      order_net: self.object.order_net.to_f.round(2),
      customer_discount_applied: self.object.customer_discount_applied,
      customer_discount: self.object.customer_discount,
      invoice_discount_applied: self.object.invoice_discount.to_f.round(2) > 0
    }
  end
end

class SingleOrderSerializer < OrderSerializer
  attributes :order_items, :terms, :invoice, :invoice_fee, :order_net
end
