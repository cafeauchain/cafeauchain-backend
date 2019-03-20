class AddStartingAmountToLots < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :roasted_on_import, :integer
  end
end
