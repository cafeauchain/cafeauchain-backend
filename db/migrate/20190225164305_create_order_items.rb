class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.uuid :product_variant_id
      t.integer :quantity
      t.float :line_item_cost
      t.references :order, foreign_key: true
      t.uuid :uuid

      t.timestamps
    end

    remove_column :order_items, :id
    rename_column :order_items, :uuid, :id
    execute "ALTER TABLE order_items ADD PRIMARY KEY (id);"

  end
end
