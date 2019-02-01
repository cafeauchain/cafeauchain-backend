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
