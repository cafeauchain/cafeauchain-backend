# == Schema Information
#
# Table name: order_shipping_methods
#
#  id                 :bigint(8)        not null, primary key
#  final_rate         :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  order_id           :bigint(8)
#  shipping_method_id :bigint(8)
#
# Indexes
#
#  index_order_shipping_methods_on_order_id            (order_id)
#  index_order_shipping_methods_on_shipping_method_id  (shipping_method_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#  fk_rails_...  (shipping_method_id => shipping_methods.id)
#

FactoryBot.define do
  factory :order_shipping_method do
    order { nil }
    shipping_method { nil }
    final_rate { 1 }
  end
end
