class CreateWholesaleProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :wholesale_profiles do |t|
      t.text :terms
      t.references :roaster_profile, foreign_key: true
      t.references :customer_profile, foreign_key: true

      t.timestamps
    end
  end
end
