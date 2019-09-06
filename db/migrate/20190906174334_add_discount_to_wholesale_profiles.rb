class AddDiscountToWholesaleProfiles < ActiveRecord::Migration[5.2]
  def change
    add_column :wholesale_profiles, :cust_discount, :float
  end
end
