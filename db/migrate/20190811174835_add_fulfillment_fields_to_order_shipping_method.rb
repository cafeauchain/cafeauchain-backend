class AddFulfillmentFieldsToOrderShippingMethod < ActiveRecord::Migration[5.2]
  def change
    add_column :order_shipping_methods, :easypost_tracker_id, :string
    add_column :order_shipping_methods, :tracking_number, :string
    add_column :order_shipping_methods, :shipment_date, :datetime
  end
end
