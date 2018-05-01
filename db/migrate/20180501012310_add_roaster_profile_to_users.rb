class AddRoasterProfileToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :roaster_profile, foreign_key: true
  end
end
