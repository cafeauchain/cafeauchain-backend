module InventoryServices
  class CreateInventory

    def self.create(lot_id, params)
      name = params[:name]
      par_level = params[:par_level]
      quantity = params[:quantity]
      roast_size = params[:roast_size]
      shrinkage = params[:shrinkage]
      @lot = Lot.find(lot_id)
      @inventory_item = InventoryItem.new(lot: @lot, name: name, par_level: par_level, quantity: quantity, roast_size: roast_size, shrinkage: shrinkage)
      if @inventory_item.save
        # @tx = LedgerServices::RoastTransaction.new(starting_amount, @batch.id, @batch.lot.roaster_profile.id).call
        return @inventory_item
      else
        return @inventory_item
      end
    end
  end
end
