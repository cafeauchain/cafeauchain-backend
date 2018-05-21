class AddTransTypeToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :trans_type, :integer, default: 0
  end
end
