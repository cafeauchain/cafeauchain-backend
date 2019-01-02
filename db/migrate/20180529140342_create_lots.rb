class CreateLots < ActiveRecord::Migration[5.1]
  def change
    create_table :lots do |t|
      t.integer :number_of_bags
      t.string :bag_size
      t.references :crop, foreign_key: true
      t.references :roaster_profile, foreign_key: true
      t.float :price_per_pound

      t.timestamps
    end
  end
end
