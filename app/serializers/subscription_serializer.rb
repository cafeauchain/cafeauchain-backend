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


require 'stripe'


class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :trial_end, :status, :amount_roasted_in_cycle, :next_bill_date, :period_start,
    :period_end, :subscription_start,
    # :new_start_date, :new_end_date, :new_next_billing_date, :balance,
    :sub_details, :balance_details, :status, :next_amount_due, :sub_items

  def amount_roasted_in_cycle
    object.user.roaster_profile.amount_roasted_in_period(object.id)
  end

  def balance_details
    Stripe.api_key = Rails.application.credentials.stripe_secret_key
    Stripe::Invoice.upcoming(customer: object.stripe_customer_id)
  end

  def next_amount_due
    balance_details.amount_due
  end

  def sub_details
    Stripe.api_key = Rails.application.credentials.stripe_secret_key
    @stripe_customer = Stripe::Customer.retrieve(object.stripe_customer_id)
    subscriptions = @stripe_customer.subscriptions
  end

  def status
    sub_details.data.pluck("status")[0]
  end

  def sub_items
    sub_details.data.pluck("items")[0]
  end

end
