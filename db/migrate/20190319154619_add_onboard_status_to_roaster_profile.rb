class AddOnboardStatusToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :onboard_status, :integer
    add_column :roaster_profiles, :wholesale_status, :integer
  end
end
