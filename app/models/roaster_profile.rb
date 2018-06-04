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
  has_many :lots
  has_many :crops, through: :lots

  def bags_delivered(lot_id)
    self.transactions.collect{ |t| t.quantity.to_i if t.lot_id == lot_id }.sum
  end

  def bags_remaining(producer_id, lot_id)
    producer = ProducerProfile.find(producer_id)
    lot = Lot.find(lot_id)
    bags_remaining = lot.bags - self.bags_delivered(lot_id)
  end
end
