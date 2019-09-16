module InventoryServices
  class CreateInventory

    def self.create(lot_id, params)
      @lot = Lot.find(lot_id)
      name = params[:name] || @lot.name 
      par_level = params[:par_level] || 0
      quantity = params[:quantity] || 0
      roast_size = params[:roast_size] || 30
      shrinkage = params[:shrinkage] || 14
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
