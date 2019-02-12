# == Schema Information
#
# Table name: subscriptions
#
#  id                     :bigint(8)        not null, primary key
#  next_bill_date         :datetime
#  status                 :integer
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

class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :trial_end, :status, :next_bill_date, :amount_roasted_in_cycle, :period_start_date, :period_end_date

  def period_start_date
    object.next_bill_date - 30.days
  end

  def period_end_date
    object.next_bill_date.end_of_day - 1.days
  end

  def amount_roasted_in_cycle
    object.user.roaster_profile.amount_roasted_in_period(object.id)
  end

end
