class AddStripeAccountIdToRoasterProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :roaster_profiles, :stripe_account_id, :string
  end
end
