module InventoryServices
  class FinishBatchRoast
    
    def self.finish(batch_id, ending_amount)
      @batch = @lot.batches.create(ending_amount: ending_amount, status: :roast_completed)
      return @batch
    end
  end
end