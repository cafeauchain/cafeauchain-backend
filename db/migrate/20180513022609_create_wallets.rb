class CreateWallets < ActiveRecord::Migration[5.1]
  def change
    create_table :wallets do |t|
      t.references :producer_profile, foreign_key: true
      t.references :roaster_profile, foreign_key: true
      t.string :roaster_wallet

      t.timestamps
    end
  end
end
