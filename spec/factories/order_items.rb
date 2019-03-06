# == Schema Information
#
# Table name: order_items
#
#  id                 :uuid             not null, primary key
#  line_item_cost     :float
#  notes              :string
#  product_options    :string           default([]), is an Array
#  quantity           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  order_id           :bigint(8)
#  product_variant_id :uuid
#
# Indexes
#
#  index_order_items_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#

FactoryBot.define do
  factory :order_item do
    product_variant_id { "" }
    quantity { 1 }
    line_item_cost { 1.5 }
    order { nil }
  end
end
