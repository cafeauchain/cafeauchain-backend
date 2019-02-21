# == Schema Information
#
# Table name: inventory_items
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  par_level  :float
#  quantity   :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  lot_id     :bigint(8)
#
# Indexes
#
#  index_inventory_items_on_lot_id  (lot_id)
#
# Foreign Keys
#
#  fk_rails_...  (lot_id => lots.id)
#

class InventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :lot_name, :quantity, :par_level, :name, :lot_id
end
