# == Schema Information
#
# Table name: transactions
#
#  id                 :bigint(8)        not null, primary key
#  quantity           :string
#  trans_type         :integer          default("asset_issue")
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  batch_id           :bigint(8)
#  crop_id            :bigint(8)
#  lot_id             :bigint(8)
#  roaster_profile_id :bigint(8)
#  tx_id              :string
#
# Indexes
#
#  index_transactions_on_batch_id            (batch_id)
#  index_transactions_on_crop_id             (crop_id)
#  index_transactions_on_lot_id              (lot_id)
#  index_transactions_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (batch_id => batches.id)
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (lot_id => lots.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :batch_id, :crop, :tx_id, :quantity, :created_at, :trans_type, :roaster_profile_id, :lot_id

  def crop
    if self.object.crop
      {crop_name: self.object.crop.name, harvest_year: self.object.crop.harvest_season}
    elsif self.object.lot.crop
      {crop_name: self.object.lot.crop.name, harvest_year: self.object.lot.harvest_year}
    elsif self.object.batch.lot.crop
      {crop_name: self.object.batch.lot.crop.name, harvest_year: self.object.batch.lot.crop.harvest_year}
    else
      {crop_name: nil, harvest_year: nil}
    end
  end
end
