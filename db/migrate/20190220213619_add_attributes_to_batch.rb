class AddAttributesToBatch < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :target_weight, :float
  end
end
