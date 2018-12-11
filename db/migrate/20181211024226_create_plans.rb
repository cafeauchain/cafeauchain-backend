class CreatePlans < ActiveRecord::Migration[5.1]
  def change
    create_table :plans do |t|
      t.string :stripe_plan_id
      t.integer :price_in_cents
      t.string :interval
      t.string :name

      t.timestamps
    end
  end
end
