class UpdateTransactionAssociations < ActiveRecord::Migration[5.1]
  def change
    add_reference :transactions, :lot, foreign_key: true
    add_reference :transactions, :batch, foreign_key: true
    add_column :lots, :harvest_year, :string
    remove_column :crops, :crop_year
  end
end
