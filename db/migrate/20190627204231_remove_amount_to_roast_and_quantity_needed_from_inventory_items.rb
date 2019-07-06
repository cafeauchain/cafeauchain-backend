class RemoveAmountToRoastAndQuantityNeededFromInventoryItems < ActiveRecord::Migration[5.2]
  def change
    remove_column :inventory_items, :amount_to_roast
    remove_column :inventory_items, :quantity_needed
  end
end
