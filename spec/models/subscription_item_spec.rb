# == Schema Information
#
# Table name: subscription_items
#
#  id              :bigint(8)        not null, primary key
#  quantity        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  plan_id         :bigint(8)
#  subscription_id :bigint(8)
#
# Indexes
#
#  index_subscription_items_on_plan_id          (plan_id)
#  index_subscription_items_on_subscription_id  (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (plan_id => plans.id)
#  fk_rails_...  (subscription_id => subscriptions.id)
#

require 'rails_helper'

RSpec.describe SubscriptionItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
