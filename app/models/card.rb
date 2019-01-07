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

class Card < ApplicationRecord
  belongs_to :subscription
end
