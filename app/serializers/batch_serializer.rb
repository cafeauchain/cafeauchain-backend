# == Schema Information
#
# Table name: batches
#
#  id                :uuid             not null, primary key
#  ending_amount     :float
#  roast_date        :date
#  starting_amount   :float
#  status            :integer
#  target_weight     :float
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  inventory_item_id :uuid
#  lot_id            :uuid
#
# Indexes
#
#  index_batches_on_created_at         (created_at)
#  index_batches_on_inventory_item_id  (inventory_item_id)
#  index_batches_on_lot_id             (lot_id)
#

class BatchSerializer < ActiveModel::Serializer
  attributes :id, :starting_amount, :ending_amount, :lot_name, :lot_label, :roast_date, :inventory_item_id, :inventory_item_name, :crop_name, :lot_id

  def inventory_item_name
    if self.object.inventory_item.present?
      self.object.inventory_item.name
    else
      "Not Found"
    end
  end

  def lot_name
    self.object.lot.name
  end

  def lot_id
    self.object.lot.id
  end

  def lot_label
    self.object.lot.label
  end

  def crop_name
    self.object.lot.crop.name + " (" + self.object.lot.harvest_year + ")"
  end
end
