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

  def update_subscription_details
    sub_data = self.sub_details.data[0]
    current_period_end = sub_data[:current_period_end]
    current_period_start = sub_data[:current_period_start]
    if Time.at(current_period_end) != :period_end
      self.update({
        next_bill_date: Time.at(current_period_end) + 1.second,
        period_start: Time.at(current_period_start),
        period_end: Time.at(current_period_end)
      })
    end

    si = sub_data.items.data.map{|item| 
      {
        name: item[:plan][:metadata][:plan_name], 
        id: item[:id],
        description: item[:plan][:metadata][:our_description]
      }
    }
    current_sub_item_ids = self.subscription_items.map(&:stripe_sub_item_id)
    sub_item_ids = si.map{|item| item[:id]}

    left = sub_item_ids - current_sub_item_ids
    right = current_sub_item_ids - sub_item_ids
    if self.subscription_items.length == 0 || left.length != 0 || right.length != 0
      self.subscription_items.destroy_all
      si.each{|item|
        SubscriptionItem.create({
          subscription_id: self.id,
          stripe_sub_item_id: item[:id],
          stripe_meta_name: item[:name],
          description: item[:description]
        })
      } 
    end
  end

  def default_card
    cards.find_by(default: true)
  end

  # Moved from serializer

  def amount_roasted_in_cycle
    self.user.roaster_profile.amount_roasted_in_period(self.id)
  end

  def balance_details
    Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
    Stripe::Invoice.upcoming(customer: self.stripe_customer_id)
  end

  def next_amount_due
    balance_details.amount_due
  end

  def sub_details
    Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
    @stripe_customer = Stripe::Customer.retrieve(self.stripe_customer_id)
    @stripe_customer.subscriptions
  end

  def status
    sub_details.data.pluck("status")[0]
  end

  def sub_items
    sub_details.data.pluck("items")[0]
  end

end
