class LotsbydateSerializer < ActiveModel::Serializer
  attributes :id, :label, :crop_name, :pounds_of_coffee, :price_per_pound, :harvest_year, :on_hand, :contract_value, :batches, :total_amount_roasted

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
    batches = InventoryServices::BatchGrouping.group(self.object.batches.where(roast_date: instance_options[:range]), instance_options[:period])
  end

  def total_amount_roasted
    self.object.amount_roasted
  end
end
