class AddShippingAndTaxRateToWholesaleProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :wholesale_profiles, :shipping, :integer
    add_column :wholesale_profiles, :tax_rate, :float
    add_column :wholesale_profiles, :onboard_status, :integer
  end
end
