class AddCustomerProfileToCard < ActiveRecord::Migration[5.2]
  def change
    add_reference :cards, :customer_profile, foreign_key: true
  end
end
