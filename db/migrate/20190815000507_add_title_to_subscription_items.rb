class AddTitleToSubscriptionItems < ActiveRecord::Migration[5.2]
  def change
    add_column :subscription_items, :title, :string
  end
end
