# == Schema Information
#
# Table name: subscription_items
#
#  id                 :bigint(8)        not null, primary key
#  stripe_meta_name   :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  stripe_sub_item_id :string
#  subscription_id    :string
#

class SubscriptionItem < ApplicationRecord
  belongs_to :subscription
  # belongs_to :plan

  # delegate :name, to: :plan, prefix: true
  # delegate :price_in_cents, to: :plan, prefix: true
end
