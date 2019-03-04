class CreateProductInventoryItems < ActiveRecord::Migration[5.2]
  def change
    create_table :product_inventory_items do |t|
      t.references :product, foreign_key: true
      t.references :inventory_item, foreign_key: true
      t.boolean :inactive, default: false

      t.timestamps
    end

    remove_column :inventory_items, :product_id
  end
end
