class AddOwnerToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :owner_id, :integer
  end
end
