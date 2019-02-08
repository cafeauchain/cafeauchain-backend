class AddStatusToBatches < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :status, :integer
  end
end
