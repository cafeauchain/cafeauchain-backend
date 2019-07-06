class AddRoastCountAndRoastSizeToBatches < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :roast_size, :float
    add_column :batches, :roast_count, :int
  end
end
