class AddSizeAndShrinkageToInventoryItems < ActiveRecord::Migration[5.2]
  def change
    add_column :inventory_items, :roast_size, :int
    add_column :inventory_items, :shrinkage, :float
  end
end
