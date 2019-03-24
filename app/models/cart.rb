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

class Cart < ApplicationRecord
  has_many :cart_items
  belongs_to :wholesale_profile

  accepts_nested_attributes_for :cart_items, reject_if: ->(attributes){ attributes['quantity'].blank? }, allow_destroy: true

  # Moved to CreateCartItem Service
  # def add_to_cart(product_variant_id, quantity)
  #   current_item = cart_items.find_by(product_variant_id: product_variant_id)
  #   if current_item && current_item.quantity != quantity.to_i
  #     current_item.update(quantity: quantity.to_i)
  #   else
  #     new_item = cart_items.create(product_variant_id: product_variant_id,
  #       quantity: quantity.to_i,
  #       cart_id: self.id)
  #     return new_item
  #   end
  # end

  def convert_to_order
    @order = self.wholesale_profile.orders.create(status: :draft)
    self.cart_items.each do |ci|
      pv = ProductVariant.find(ci.product_variant_id)
      @order.order_items.create(product_variant_id: pv.id, quantity: ci.quantity, line_item_total: (ci.quantity * pv.price_in_cents))
    end
    @invoice = @order.create_invoice
    if @order.update(status: :processing)
      self.cart_items.destroy_all
    end
    return @order
  end

  def total_weight
    cart_items.sum { |ci| ci.product_variant.custom_options["size"].to_i * ci.quantity }
  end

end
