class CreateBatches < ActiveRecord::Migration[5.1]
  def change
    create_table :batches do |t|
      t.references :lot, foreign_key: true
      t.float :starting_amount
      t.float :ending_amount

      t.timestamps
    end
  end
end
