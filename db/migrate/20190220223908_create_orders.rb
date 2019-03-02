class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.references :wholesale_profile, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
