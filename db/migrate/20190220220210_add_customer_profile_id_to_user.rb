class AddCustomerProfileIdToUser < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :customer_profile, foreign_key: true
  end
end
