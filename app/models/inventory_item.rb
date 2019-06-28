# == Schema Information
#
# Table name: inventory_items
#
#  id         :uuid             not null, primary key
#  name       :string
#  par_level  :float
#  quantity   :float
#  roast_size :integer
#  shrinkage  :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  lot_id     :uuid
#
# Indexes
#
#  index_inventory_items_on_created_at  (created_at)
#  index_inventory_items_on_lot_id      (lot_id)
#

class InventoryItem < ApplicationRecord
  has_many :product_inventory_items
  has_many :products, through: :product_inventory_items
  has_many :batches
  
  belongs_to :lot

  # You can achieve this with
  # delegate :name, :lot

  def lot_name
    lot.name
  end

  def quantity_needed
    totaled_inventory_item = self.lot.roaster_profile.getOpenOrderAmounts.find{ |ii| ii["ii_id"] == self.id }
    totaled_inventory_item.present? ? totaled_inventory_item["weight"] : 0
  end

  def amount_to_roast
    amount_check = self.quantity.to_f - self.quantity_needed - self.par_level.to_f
    amount_check < 0 ? amount_check.abs : 0
  end
end
