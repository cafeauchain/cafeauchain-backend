# == Schema Information
#
# Table name: wholesale_profiles
#
#  id                  :bigint(8)        not null, primary key
#  cust_discount       :float
#  onboard_status      :integer
#  shipping            :integer
#  tax_rate            :float
#  terms               :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  customer_profile_id :bigint(8)
#  roaster_profile_id  :bigint(8)
#
# Indexes
#
#  index_wholesale_profiles_on_customer_profile_id  (customer_profile_id)
#  index_wholesale_profiles_on_roaster_profile_id   (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_profile_id => customer_profiles.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class WholesaleProfile < ApplicationRecord
  belongs_to :roaster_profile
  belongs_to :customer_profile
  has_one :cart
  has_many :orders

  enum onboard_status: [:profile, :addresses, :payment, :shipping, :onboard_completed, :approved]
  # enum shipping: roaster_profile.shipping_methods

end
