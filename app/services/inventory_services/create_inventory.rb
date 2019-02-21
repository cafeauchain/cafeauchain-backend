module InventoryServices
  class CreateInventory

    def self.create(lot_id, name, par_level, quantity)
      @lot = Lot.find(lot_id)
      @inventory_item = InventoryItem.new(lot: @lot, name: name, par_level: par_level, quantity: quantity)
      if @inventory_item.save
        # @tx = LedgerServices::RoastTransaction.new(starting_amount, @batch.id, @batch.lot.roaster_profile.id).call
        return @inventory_item
      else
        return @inventory_item
      end
    end
  end
end
