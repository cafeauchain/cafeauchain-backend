# == Schema Information
#
# Table name: transactions
#
#  id                 :uuid             not null, primary key
#  quantity           :string
#  trans_type         :integer          default("asset_issue")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  batch_id           :uuid
#  crop_id            :bigint(8)
#  lot_id             :uuid
#  roaster_profile_id :bigint(8)
#  tx_id              :string
#
# Indexes
#
#  index_transactions_on_batch_id            (batch_id)
#  index_transactions_on_created_at          (created_at)
#  index_transactions_on_crop_id             (crop_id)
#  index_transactions_on_lot_id              (lot_id)
#  index_transactions_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class Transaction < ApplicationRecord
  include Filterable
  belongs_to :crop, optional: true
  belongs_to :lot, optional: true
  belongs_to :batch, optional: true
  belongs_to :roaster_profile, optional: true

  enum trans_type: [:asset_issue, :asset_transfer, :asset_delivery, :queued, :roasted, :ready_for_sale]
  
  scope :trans_type, -> (trans_type) { where trans_type: trans_type }
  scope :order_by, -> (order_by) { order order_by }
end
