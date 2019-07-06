module InventoryServices
  class StartBatchRoast

    def self.start(lot_id, params)
      @lot = Lot.find(lot_id)
      starting_amount = params[:starting_amount]
      roast_date = params[:roast_date]
      inventory_item = InventoryItem.find(params[:inventory_item_id])
      roast_size = params[:roast_size]

      @batch = Batch.create(
        lot: @lot,
        inventory_item: inventory_item,
        starting_amount: starting_amount, 
        status: :roast_in_progress, 
        roast_date: roast_date, 
        roast_size: roast_size
      )
    end
  end
end
