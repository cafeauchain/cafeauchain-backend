class AddInactiveToProductInventoryItem < ActiveRecord::Migration[5.2]
  def change
    add_column :product_inventory_items, :inactive, :boolean, default: false
  end
end
