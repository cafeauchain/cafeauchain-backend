class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.references :crop, foreign_key: true
      t.string :tx_id
      t.string :quantity

      t.timestamps
    end
  end
end
