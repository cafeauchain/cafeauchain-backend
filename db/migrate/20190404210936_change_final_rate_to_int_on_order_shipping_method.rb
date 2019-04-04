class ChangeFinalRateToIntOnOrderShippingMethod < ActiveRecord::Migration[5.2]
  def change
    change_column :order_shipping_methods, :final_rate, :float
  end
end
