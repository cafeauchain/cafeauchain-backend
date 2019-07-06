module InventoryServices
  class AddRoastToInventory

    def self.call(inventory_item, ending_amount)
      new_quantity = inventory_item.quantity.to_f + ending_amount.to_f
      # @inventory_item = InventoryItem.find_by(lot_id: lot_id)
      # TODO Still do not know why this doesnt work - KS
      # @inventory_item.increment(quantity: ending_amount.to_f)
      # @inventory_item.save
      inventory_item.update(quantity: new_quantity)
      return inventory_item
    end
  end
end
