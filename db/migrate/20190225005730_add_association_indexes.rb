class AddAssociationIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :batches, :lot_id
    add_index :batches, :inventory_item_id
    add_index :transactions, :lot_id
    add_index :transactions, :batch_id
    add_index :inventory_items, :lot_id
    add_index :product_variants, :product_id
    add_index :product_inventory_items, :product_id
    add_index :product_inventory_items, :inventory_item_id
    
    add_index :transactions, :created_at
    add_index :products, :created_at
    add_index :lots, :created_at
    add_index :subscription_charges, :created_at
    add_index :batches, :created_at
    add_index :product_variants, :created_at
    add_index :inventory_items, :created_at
    add_index :product_inventory_items, :created_at
  end
end
