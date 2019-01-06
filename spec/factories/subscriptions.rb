# == Schema Information
#
# Table name: subscriptions
#
#  id                     :bigint(8)        not null, primary key
#  status                 :integer
<<<<<<< HEAD
#  trial_end              :datetime
=======
>>>>>>> Adds owner to roaster profile and Stripe subscription id to subscription
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
