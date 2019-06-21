class AddQuantityNeededToInventoryItems < ActiveRecord::Migration[5.2]
  def change
    add_column :inventory_items, :quantity_needed, :float, default: 0
    add_column :inventory_items, :amount_to_roast, :float, default: 0
  end
end
