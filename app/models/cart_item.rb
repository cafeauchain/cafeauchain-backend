# == Schema Information
#
# Table name: cart_items
#
#  id                 :bigint(8)        not null, primary key
#  notes              :string
#  production_options :string           default([]), is an Array
#  quantity           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  cart_id            :bigint(8)
#  product_variant_id :uuid
#
# Indexes
#
#  index_cart_items_on_cart_id             (cart_id)
#  index_cart_items_on_product_variant_id  (product_variant_id)
#
# Foreign Keys
#
#  fk_rails_...  (cart_id => carts.id)
#

class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product_variant
end
