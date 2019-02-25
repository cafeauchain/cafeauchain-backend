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

require 'rails_helper'

RSpec.describe SubscriptionCharge, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
