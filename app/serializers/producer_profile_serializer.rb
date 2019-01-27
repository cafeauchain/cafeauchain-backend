# == Schema Information
#
# Table name: producer_profiles
#
#  id             :bigint(8)        not null, primary key
#  latitude       :string
#  location       :string
#  longitude      :string
#  name           :string
#  network_port   :string
#  rpc_port       :string
#  slug           :string
#  wallet_address :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ProducerProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug

end
