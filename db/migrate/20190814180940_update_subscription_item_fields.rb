class UpdateSubscriptionItemFields < ActiveRecord::Migration[5.2]
  def change
    add_column :subscription_items, :stripe_sub_item_id, :string
    add_column :subscription_items, :stripe_meta_name, :string
    remove_column :subscription_items, :plan_id, :string
    remove_column :subscription_items, :quantity, :string
  end
end
