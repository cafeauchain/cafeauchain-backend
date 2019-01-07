# == Schema Information
#
# Table name: cards
#
#  id              :bigint(8)        not null, primary key
#  brand           :string
#  default         :boolean
#  exp_month       :integer
#  exp_year        :integer
#  last4           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subscription_id :bigint(8)
#
# Indexes
#
#  index_cards_on_subscription_id  (subscription_id)
#
# Foreign Keys
#
#  fk_rails_...  (subscription_id => subscriptions.id)
#

require 'rails_helper'

RSpec.describe Card, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
