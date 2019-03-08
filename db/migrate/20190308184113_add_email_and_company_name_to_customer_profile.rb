class AddEmailAndCompanyNameToCustomerProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :customer_profiles, :email, :string
    add_column :customer_profiles, :company_name, :string
  end
end
