class InventoryItemSerializer < ActiveModel::Serializer
  attributes :id, :lot_name, :quantity, :par_level
end
