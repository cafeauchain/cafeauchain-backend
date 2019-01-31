class LotSerializer < ActiveModel::Serializer
  attributes :id, :pounds_of_coffee, :price_per_pound, :harvest_year, :on_hand, :contract_value

  belongs_to :crop
  belongs_to :roaster_profile

  def on_hand
    self.object.coffee_on_hand
  end

  def contract_value
    self.object.contract_value
  end
end
