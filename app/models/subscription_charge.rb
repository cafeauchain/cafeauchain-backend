# == Schema Information
#
# Table name: subscription_charges
#
#  id               :bigint(8)        not null, primary key
#  amount           :integer
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  stripe_charge_id :string
#  subscription_id  :bigint(8)
#
# Indexes
#
#  index_subscription_charges_on_subscription_id  (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (subscription_id => subscriptions.id)
#

class SubscriptionCharge < ApplicationRecord
  belongs_to :subscription
end
