# == Schema Information
#
# Table name: lots
#
#  id                 :bigint(8)        not null, primary key
#  harvest_year       :string
#  pounds_of_coffee   :float
#  price_per_pound    :float
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  crop_id            :bigint(8)
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_lots_on_crop_id             (crop_id)
#  index_lots_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class LotSerializer < ActiveModel::Serializer
  attributes :id, :crop_name, :pounds_of_coffee, :price_per_pound, :harvest_year, :on_hand, :contract_value, :batches, :total_amount_roasted

  belongs_to :crop
  belongs_to :roaster_profile

  def on_hand
    self.object.coffee_on_hand
  end

  def contract_value
    self.object.contract_value
  end

  def crop_name
    self.object.crop.name + " (" + self.object.harvest_year + ")"
  end

  def batches
    batches = InventoryServices::BatchGrouping.group(self.object.batches, instance_options[:period])
  end

  def total_amount_roasted
    self.object.amount_roasted
  end
end
