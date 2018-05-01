class CreateRoasterProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :roaster_profiles do |t|
      t.string :name
      t.string :location
      t.string :slug
      t.string :url
      t.string :twitter
      t.string :facebook

      t.timestamps
    end
  end
end
