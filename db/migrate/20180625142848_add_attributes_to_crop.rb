class AddAttributesToCrop < ActiveRecord::Migration[5.1]
  def change
    add_column :crops, :region, :string
    add_column :crops, :country, :string
    add_column :crops, :harvest_season, :string
    add_column :crops, :altitude, :string
    add_column :crops, :process, :string
    remove_column :crops, :zone
  end
end
