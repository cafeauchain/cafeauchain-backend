class CreateInventoryItems < ActiveRecord::Migration[5.2]
  def change
    create_table :inventory_items do |t|
      t.references :product, foreign_key: true
      t.float :quantity
      t.float :par_level
      t.references :lot, foreign_key: true

      t.timestamps
    end
  end
end
