# == Schema Information
#
# Table name: wallets
#
#  id                  :bigint(8)        not null, primary key
#  roaster_wallet      :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  producer_profile_id :bigint(8)
#  roaster_profile_id  :bigint(8)
#
# Indexes
#
#  index_wallets_on_producer_profile_id  (producer_profile_id)
#  index_wallets_on_roaster_profile_id   (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (producer_profile_id => producer_profiles.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class Wallet < ApplicationRecord
  belongs_to :producer_profile
  belongs_to :roaster_profile
end
