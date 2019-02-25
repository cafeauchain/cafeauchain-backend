# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_orders_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

class Order < ApplicationRecord
  belongs_to :wholesale_profile
  has_many :order_items

  enum status: [:draft, :processing, :awaiting_payment, :fulfilled, :complete]
end
