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
#  index_cart_items_on_cart_id  (cart_id)
#
# Foreign Keys
#
#  fk_rails_...  (cart_id => carts.id)
#

FactoryBot.define do
  factory :cart_item do
    cart { nil }
  end
end
