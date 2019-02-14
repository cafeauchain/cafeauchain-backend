class AddSubscriptionStartToSubscriptions < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :subscription_start, :date
  end
end
