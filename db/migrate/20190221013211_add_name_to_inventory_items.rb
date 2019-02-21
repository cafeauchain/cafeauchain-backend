class AddNameToInventoryItems < ActiveRecord::Migration[5.2]
  def change
    add_column :inventory_items, :name, :string
  end
end
