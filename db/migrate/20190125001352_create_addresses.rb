class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.float :latitude
      t.float :longitude
      t.string :google_places_id
      t.string :location_label
      t.string :street_1
      t.string :street_2
      t.string :city
      t.string :state
      t.string :country
      t.string :postal_code
      t.boolean :primary_location, default: false

      t.timestamps
    end
  end
end
