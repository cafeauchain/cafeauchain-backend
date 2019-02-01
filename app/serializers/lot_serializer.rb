class LotSerializer < ActiveModel::Serializer
  attributes :id, :crop_name, :pounds_of_coffee, :price_per_pound, :harvest_year, :on_hand, :contract_value, :amount_roasted

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

  def amount_roasted
    self.object.amount_roasted
  end
end
