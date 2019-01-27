class CropSerializer < ActiveModel::Serializer
  attributes :id, :name, :region, :varietal, :altitude, :producer_profile_id
end
