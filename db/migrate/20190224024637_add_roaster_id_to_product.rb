class AddRoasterIdToProduct < ActiveRecord::Migration[5.2]
  def change
    add_reference :products, :roaster_profile, foreign_key: true
  end
end
