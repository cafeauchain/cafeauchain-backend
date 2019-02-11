module InventoryServices
  class FinishBatchRoast
    
    def self.finish(batch_id, ending_amount)
      @batch = Batch.find(batch_id)
      @batch.update(ending_amount: ending_amount, status: :roast_completed)
      return @batch
    end
  end
end