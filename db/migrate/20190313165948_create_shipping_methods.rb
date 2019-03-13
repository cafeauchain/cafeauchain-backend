class CreateShippingMethods < ActiveRecord::Migration[5.2]
  def change
    create_table :shipping_methods do |t|
      t.references :roaster_profile, foreign_key: true
      t.integer :carrier
      t.string :account_id
      t.string :friendly_name
      t.string :easy_post_account_ref
      t.boolean :flat_rate, default: false
      t.float :rate

      t.timestamps
    end
  end
end
