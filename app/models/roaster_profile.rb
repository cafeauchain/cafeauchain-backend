# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  facebook   :string
#  location   :string
#  name       :string
#  slug       :string
#  twitter    :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RoasterProfile < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  has_many :users
  has_many :wallets
  has_many :transactions
  has_many :crops, through: :transactions

  def bags_delivered(crop_id)
    self.transactions.collect{ |t| t.quantity.to_i if t.crop_id == crop_id }.sum
  end

  def bags_remaining(producer_id, crop_id)
    producer = ProducerProfile.find(producer_id)
    crop = Crop.find(crop_id)
    bags_remaining = crop.bags - self.bags_delivered(crop_id)
  end
end
