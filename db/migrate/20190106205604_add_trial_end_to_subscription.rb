class AddTrialEndToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :trial_end, :datetime
  end
end
