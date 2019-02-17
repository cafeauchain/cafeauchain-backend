class AddNameToLots < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :name, :string
  end
end
