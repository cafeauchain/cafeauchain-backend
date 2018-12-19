class CreateSubscriptionCharges < ActiveRecord::Migration[5.1]
  def change
    create_table :subscription_charges do |t|
      t.references :subscription, foreign_key: true
      t.string :stripe_charge_id
      t.text :description
      t.integer :amount

      t.timestamps
    end
  end
end
