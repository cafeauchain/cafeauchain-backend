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

FactoryBot.define do
  factory :subscription do
    user { nil }
    status { 1 }
    stripe_customer_id { "MyString" }
  end
end
