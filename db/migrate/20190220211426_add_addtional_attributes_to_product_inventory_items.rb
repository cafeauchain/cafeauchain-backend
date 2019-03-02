class AddAddtionalAttributesToProductInventoryItems < ActiveRecord::Migration[5.2]
  def change
    add_column :product_inventory_items, :percentage_of_product, :float
  end
end
