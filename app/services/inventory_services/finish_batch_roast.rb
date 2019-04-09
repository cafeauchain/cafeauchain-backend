module InventoryServices
  class FinishBatchRoast

    def self.finish(batch_id, ending_amount, starting_amount=nil, inventory_item_id=nil)
      @batch = Batch.find(batch_id)
      @starting_amount = starting_amount.nil? ? @batch.starting_amount : starting_amount
      @inventory_item_id = inventory_item_id.nil? ? @batch.inventory_item_id : inventory_item_id
      @batch.update(ending_amount: ending_amount, status: :roast_completed, starting_amount: @starting_amount, inventory_item_id: @inventory_item_id)
      return @batch
    end
  end
end
