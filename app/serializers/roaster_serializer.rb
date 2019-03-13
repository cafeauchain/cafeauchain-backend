class RoasterSerializer < ActiveModel::Serializer
  attributes :id, :logo_image_url, :primary_address, :url, :twitter, :facebook, :about, :name
end
