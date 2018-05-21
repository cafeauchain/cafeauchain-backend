# == Schema Information
#
# Table name: transactions
#
#  id                 :bigint(8)        not null, primary key
#  quantity           :string
#  trans_type         :integer          default("assetissue")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  crop_id            :bigint(8)
#  roaster_profile_id :bigint(8)
#  tx_id              :string
#
# Indexes
#
#  index_transactions_on_crop_id             (crop_id)
#  index_transactions_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class Transaction < ApplicationRecord
  belongs_to :crop
  belongs_to :roaster

  enum trans_type: [:assetissue, :assettx] 
end
