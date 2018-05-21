class CreateCrops < ActiveRecord::Migration[5.1]
  def change
    create_table :crops do |t|
      t.references :producer_profile, foreign_key: true
      t.string :crop_year
      t.string :zone
      t.string :varietal
      t.integer :bags
      t.string :bag_size

      t.timestamps
    end
  end
end
