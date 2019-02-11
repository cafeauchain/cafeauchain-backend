class AddStatusAttributesToLot < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :status, :integer
    add_column :lots, :contract_open, :datetime
    add_column :lots, :contract_filled, :datetime
  end
end
