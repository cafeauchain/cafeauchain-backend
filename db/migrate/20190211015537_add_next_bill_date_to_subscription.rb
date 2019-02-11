class AddNextBillDateToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :next_bill_date, :datetime
  end
end
