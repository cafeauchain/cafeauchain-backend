# == Schema Information
#
# Table name: inventory_items
#
#  id              :uuid             not null, primary key
#  amount_to_roast :float            default(0.0)
#  name            :string
#  par_level       :float
#  quantity        :float
#  quantity_needed :float            default(0.0)
#  roast_size      :integer
#  shrinkage       :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  lot_id          :uuid
#
# Indexes
#
#  index_inventory_items_on_created_at  (created_at)
#  index_inventory_items_on_lot_id      (lot_id)
#

class InventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :lot_name, :quantity, :par_level, :name, :lot_id, :roast_size, :shrinkage, :quantity_needed, :amount_to_roast
end
