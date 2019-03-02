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

class LotSerializer < ActiveModel::Serializer
  attributes :id, :label, :crop_name, :name, :pounds_of_coffee, :price_per_pound, :harvest_year, :on_hand, :contract_value, :total_amount_roasted, :in_warehouse, :low_on_hand, :low_remaining

  belongs_to :crop
  # belongs_to :roaster_profile

  def on_hand
    self.object.coffee_on_hand
  end

  def in_warehouse
    self.object.coffee_in_warehouse
  end

  def contract_value
    self.object.contract_value
  end

  def crop_name
    self.object.crop.name + " (" + self.object.harvest_year + ")"
  end

  def total_amount_roasted
    self.object.amount_roasted
  end

  def transactions
      self.object.transactions
  end

  def batches
    batches = InventoryServices::BatchGrouping.group(self.object.batches.where(roast_date: instance_options[:range]), instance_options[:period])
  end
end

class SingleLotSerializer < LotSerializer
  attributes :transactions

  def transactions
    self.object.transactions.map do |trx|
      TransactionSerializer.new(trx)
    end
  end
end

class LotsByDateSerializer < LotSerializer
  attributes :batches
end
