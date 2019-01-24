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

class ProducerProfile < ApplicationRecord
  extend FriendlyId
  # after_create_commit :generate_port_numbers
  # after_create_commit :create_chain
  
  friendly_id :name, use: [:slugged, :finders]

  has_many :crops
  has_many :wallets
  
  accepts_nested_attributes_for :crops, reject_if: ->(attributes){ attributes['name'].blank? }, allow_destroy: true

  def generate_port_numbers
    if self.rpc_port.nil?
      rpc_port = ProducerProfile.first.rpc_port.to_i + self.id
      network_port = ProducerProfile.first.network_port.to_i + self.id
      self.update(rpc_port: rpc_port.to_s, network_port: network_port.to_s)
    else
      return "Ports already set"
    end
  end

  def create_chain
    MultichainServices::CreateChainService.new(self.slug, self.network_port, self.rpc_port).call
    address = MultichainServices::GetNodeAddressService.new(self.slug, self.rpc_port).call
    self.update(wallet_address: address)
  end

  def total_bags(crop_id)
    self.crops.sum(:bags)
  end
end
