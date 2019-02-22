module InventoryServices
  class AddRoastToInventory

    def self.call(inventory_item_id, ending_amount)
      @inventory_item = InventoryItem.find(inventory_item_id)
      # TODO Still do not know why this doesnt work - KS
      # @inventory_item.increment(quantity: ending_amount.to_f)
      # @inventory_item.save
      @inventory_item.update(quantity: @inventory_item.quantity.to_f + ending_amount.to_f)
      return @inventory_item
    end
  end
end
