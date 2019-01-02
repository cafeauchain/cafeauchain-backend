class AddAddress2ToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :address_2, :string
  end
end
