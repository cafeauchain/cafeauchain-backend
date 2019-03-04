# == Schema Information
#
# Table name: subscriptions
#
#  id                     :bigint(8)        not null, primary key
#  next_bill_date         :datetime
#  period_end             :datetime
#  period_start           :datetime
#  status                 :integer
#  subscription_start     :date
#  trial_end              :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  stripe_customer_id     :string
#  stripe_subscription_id :string
#  user_id                :bigint(8)
#
# Indexes
#
#  index_subscriptions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Subscription < ApplicationRecord
  belongs_to :user

  has_many :subscription_items
  has_many :subscription_charges
  has_many :cards

  enum status: [:active, :trial, :inactive, :suspended]

  def default_card
    cards.find_by(default: true)
  end

  def next_charge_amount
    charge_amounts_in_cents = []
    subscription_items.each do |si|
      charge_amounts_in_cents.push(si.quantity * si.plan.price_in_cents.to_f)
    end
    next_charge = (charge_amounts_in_cents.sum / 100)
  end

  def find_subscription_item_id(stripe_sub, stripe_plan_id)
    sub_items = stripe_sub.items.data.select{ |si| si.plan.id == stripe_plan_id}
    if sub_items.empty?
      stripe_sub.items = [
        {plan: stripe_plan_id}
      ]
      stripe_sub.save
      sub_item = stripe_sub.items.data.select{ |si| si.plan.id == stripe_plan_id}
      sub_item_id = sub_item.first.id
    else
      sub_item_id = sub_items.first.id
    end
  end

end
