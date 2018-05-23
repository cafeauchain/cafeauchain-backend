class AddNameToCrops < ActiveRecord::Migration[5.1]
  def change
    add_column :crops, :name, :string
  end
end
