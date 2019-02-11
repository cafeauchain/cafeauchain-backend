class AddLabelToLot < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :label, :string
  end
end
