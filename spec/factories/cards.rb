# == Schema Information
#
# Table name: cards
#
#  id                  :bigint(8)        not null, primary key
#  brand               :string
#  default             :boolean
#  exp_month           :integer
#  exp_year            :integer
#  last4               :string
#  name                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  customer_profile_id :bigint(8)
#  stripe_card_id      :string
#  subscription_id     :bigint(8)
#
# Indexes
#
#  index_cards_on_customer_profile_id  (customer_profile_id)
#  index_cards_on_subscription_id      (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_profile_id => customer_profiles.id)
#  fk_rails_...  (subscription_id => subscriptions.id)
#

FactoryBot.define do
  factory :card do
    subscription { nil }
    last4 { "MyString" }
    exp_month { 1 }
    exp_year { 1 }
    brand { "MyString" }
    default { false }
  end
end
