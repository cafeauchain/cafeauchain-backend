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

class InventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :lot_name, :quantity, :par_level, :name, :lot_id
end
