# == Schema Information
#
# Table name: order_shipping_methods
#
#  id                  :bigint(8)        not null, primary key
#  carrier             :string
#  final_rate          :float
#  service             :string
#  shipment_date       :datetime
#  tracking_number     :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  easypost_tracker_id :string
#  order_id            :bigint(8)
#
# Indexes
#
#  index_order_shipping_methods_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#

class OrderShippingMethod < ApplicationRecord
  belongs_to :order
  # belongs_to :shipping_method
end
