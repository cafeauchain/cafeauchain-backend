module InventoryServices
  class StartBatchRoast
    
    def start(lot_id, starting_amount)
      @lot = Lot.find(lot_id)
      @batch = @lot.batches.create(starting_amount: starting_amount, status: :roast_in_progress)
      if @batch.save
        @tx = LedgerServices::RoastTransaction.new(params[:starting_amount], @batch.id, @roaster.id).call
        return @batch
      else
        return @batch
      end
    end
  end
end