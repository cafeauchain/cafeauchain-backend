class UpdateOrderItemValuesToDecimal < ActiveRecord::Migration[5.2]
  def change
    change_column :order_items, :line_item_cost, :int, null: false
  end
end
