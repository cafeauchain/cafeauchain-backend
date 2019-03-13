# == Schema Information
#
# Table name: lots
#
#  id                 :uuid             not null, primary key
#  contract_filled    :datetime
#  contract_open      :datetime
#  harvest_year       :string
#  label              :string
#  low_on_hand        :integer
#  low_remaining      :integer
#  name               :string
#  pounds_of_coffee   :float
#  price_per_pound    :float
#  status             :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  crop_id            :bigint(8)
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_lots_on_created_at          (created_at)
#  index_lots_on_crop_id             (crop_id)
#  index_lots_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class Lot < ApplicationRecord
  belongs_to :crop
  belongs_to :roaster_profile
  has_many :batches
  has_many :transactions
  has_many :inventory_items
  has_many :products, through: :inventory_items

  enum status: [:open, :delivered_in_full, :roasted_in_full]

  def contract_value
    return self.price_per_pound.to_f * self.pounds_of_coffee.to_f
  end

  def coffee_on_hand
    roasted = self.batches.pluck(:starting_amount).map{|sa| sa.to_f}.sum
    delivered = self.transactions.where(trans_type: :asset_delivery).pluck(:quantity).map{|q| q.to_f}.sum
    return (delivered - roasted)
  end

  def coffee_in_warehouse
    delivered = self.transactions.where(trans_type: :asset_delivery).pluck(:quantity).map{|q| q.to_f}.sum
    return (self.pounds_of_coffee.to_f - delivered)
  end

  def amount_roasted
    roasted = self.batches.pluck(:starting_amount).map{|sa| sa.to_f || 0}.sum
  end
end
