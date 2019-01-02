class AddAttributesToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :address_1, :string
    add_column :roaster_profiles, :zip_code, :string
    add_column :roaster_profiles, :state, :string
    add_column :roaster_profiles, :city, :string
    add_column :roaster_profiles, :about, :text
  end
end
