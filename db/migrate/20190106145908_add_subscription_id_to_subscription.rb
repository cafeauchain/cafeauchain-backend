class AddSubscriptionIdToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :stripe_subscription_id, :string
  end
end
