class CreateProducerProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :producer_profiles do |t|
      t.string :name
      t.string :location
      t.string :slug
      t.string :wallet_address
      t.string :rpc_port
      t.string :network_port
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
