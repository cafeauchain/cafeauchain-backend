class AddColumnsToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :period_start, :datetime
    add_column :subscriptions, :period_end, :datetime
  end
end
