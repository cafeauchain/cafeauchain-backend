# == Schema Information
#
# Table name: inventory_items
#
#  id         :uuid             not null, primary key
#  name       :string
#  par_level  :float
#  quantity   :float
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
end
