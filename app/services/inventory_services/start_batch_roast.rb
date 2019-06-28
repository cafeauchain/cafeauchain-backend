module InventoryServices
  class StartBatchRoast

    def self.start(lot_id, params)
      @lot = Lot.find(lot_id)
      starting_amount = params[:starting_amount]
      roast_date = params[:roast_date]
      inventory_item_id = params[:inventory_item_id]
      roast_size = params[:roast_size]

      @batch = Batch.new(
        lot: @lot, 
        starting_amount: starting_amount, 
        status: :roast_in_progress, 
        roast_date: roast_date, 
        inventory_item_id: inventory_item_id, 
        roast_size: roast_size
      )
      if @batch.save
        @tx = LedgerServices::RoastTransaction.new(starting_amount, @batch.id, @batch.lot.roaster_profile.id).call
        return @batch
      else
        return @batch
      end
    end
  end
end
