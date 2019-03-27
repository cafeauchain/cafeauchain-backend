class RemoveShippingMethodIdFromOrderShippingMethods < ActiveRecord::Migration[5.2]
  def change
    remove_column :order_shipping_methods, :shipping_method_id, :bigint
  end
end
