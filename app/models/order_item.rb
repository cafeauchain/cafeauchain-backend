# == Schema Information
#
# Table name: order_items
#
#  id                 :uuid             not null, primary key
#  line_item_cost     :float
#  product_options    :string           default([]), is an Array
#  quantity           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  order_id           :bigint(8)
#  product_variant_id :uuid
#
# Indexes
#
#  index_order_items_on_order_id            (order_id)
#  index_order_items_on_product_variant_id  (product_variant_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#

class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product_variant
end
