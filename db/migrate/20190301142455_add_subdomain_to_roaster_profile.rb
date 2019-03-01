class AddSubdomainToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :subdomain, :string
  end
end
