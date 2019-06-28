class RemoveTargetWeightandRoastCountFromBatches < ActiveRecord::Migration[5.2]
  def change
    remove_column :batches, :target_weight
    remove_column :batches, :roast_count
  end
end
