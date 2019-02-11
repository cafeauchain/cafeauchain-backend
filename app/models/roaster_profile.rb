# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  about      :text
#  address_1  :string
#  address_2  :string
#  city       :string
#  facebook   :string
#  location   :string
#  name       :string
#  slug       :string
#  state      :string
#  twitter    :string
#  url        :string
#  zip_code   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#

class RoasterProfile < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :users
  has_many :wallets
  has_many :transactions
  has_many :lots
  has_many :crops, through: :lots
  has_many :batches, through: :lots
  has_many :addresses, as: :addressable, dependent: :destroy

  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  has_one_attached :logo

  delegate :subscription, to: :owner

  def bags_delivered(lot_id)
    self.transactions.collect{ |t| t.quantity.to_i if t.lot_id == lot_id }.sum
  end

  def bags_remaining(producer_id, lot_id)
    producer = ProducerProfile.find(producer_id)
    lot = Lot.find(lot_id)
    bags_remaining = lot.bags - self.bags_delivered(lot_id)
  end

  def amount_roasted_in_period(subscription_id)
    subscription = Subscription.find(subscription_id)
    if Date.today <= subscription.trial_end && self.batches.pluck(:starting_amount).sum <= 500
      return false
    elsif 
      batches = self.batches
    else
      date_range = (subscription.next_bill_date - 30.days)..subscription.next_bill_date
      batches = self.batches.where(created_at: date_range)
    end
    pounds_roasted_in_period = batches.pluck(:starting_amount).sum
  end
  

  def set_owner
    if self.owner.nil?
      owner = self.users.first
      self.update(owner: owner)
    end
  end

end
