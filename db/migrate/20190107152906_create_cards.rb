class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.references :subscription, foreign_key: true
      t.string :last4
      t.integer :exp_month
      t.integer :exp_year
      t.string :brand
      t.boolean :default

      t.timestamps
    end
  end
end
