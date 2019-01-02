class ChangeLotWeightTracking < ActiveRecord::Migration[5.1]
  def change
    remove_column :lots, :bag_size
    remove_column :lots, :number_of_bags
    add_column :lots, :pounds_of_coffee, :float
  end
end
