class AddInventoryItemIdToBatches < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :inventory_item_id, :integer
  end
end
