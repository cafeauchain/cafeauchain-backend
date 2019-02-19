class AddLowStocksToLots < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :low_on_hand, :integer
    add_column :lots, :low_remaining, :integer
  end
end
