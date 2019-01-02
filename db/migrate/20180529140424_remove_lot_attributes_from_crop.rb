class RemoveLotAttributesFromCrop < ActiveRecord::Migration[5.1]
  def change
    remove_column :crops, :bags
    remove_column :crops, :bag_size
  end
end
