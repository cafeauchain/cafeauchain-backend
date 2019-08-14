class AddDescriptionToSubscriptionItems < ActiveRecord::Migration[5.2]
  def change
    add_column :subscription_items, :description, :string
  end
end
