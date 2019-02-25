# == Schema Information
#
# Table name: subscription_charges
#
#  id               :uuid             not null, primary key
#  amount           :integer
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  stripe_charge_id :string
#  subscription_id  :bigint(8)
#
# Indexes
#
#  index_subscription_charges_on_created_at       (created_at)
#  index_subscription_charges_on_subscription_id  (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (subscription_id => subscriptions.id)
#

FactoryBot.define do
  factory :subscription_charge do
    subscription { nil }
    stripe_charge_id { "MyString" }
    description { "MyText" }
    amount { 1 }
  end
end
