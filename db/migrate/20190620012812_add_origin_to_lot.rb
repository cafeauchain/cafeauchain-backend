class AddOriginToLot < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :origin, :string
  end
end
