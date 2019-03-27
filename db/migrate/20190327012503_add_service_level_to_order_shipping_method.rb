class AddServiceLevelToOrderShippingMethod < ActiveRecord::Migration[5.2]
  def change
    add_column :order_shipping_methods, :service, :string
    add_column :order_shipping_methods, :carrier, :string
  end
end
