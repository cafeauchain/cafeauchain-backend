module InventoryServices
  class StartBatchRoast

    def self.start(lot_id, starting_amount, roast_date)
      @lot = Lot.find(lot_id)
      @batch = Batch.new(lot: @lot, starting_amount: starting_amount, status: :roast_in_progress, roast_date: roast_date)
      if @batch.save
        @tx = LedgerServices::RoastTransaction.new(starting_amount, @batch.id, @batch.lot.roaster_profile.id).call
        return @batch
      else
        return @batch
      end
    end
  end
end
