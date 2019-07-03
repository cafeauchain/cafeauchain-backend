module InventoryServices
  class FinishBatchRoast

    def self.finish(batch_id, params)
      @batch = Batch.find(batch_id)
      starting_amount = params[:starting_amount]
      inventory_item_id = params[:inventory_item_id]
      @starting_amount = starting_amount.nil? ? @batch.starting_amount : starting_amount
      @inventory_item_id = inventory_item_id.nil? ? @batch.inventory_item_id : inventory_item_id
      @batch.update(
        ending_amount: params[:ending_amount], 
        status: :roast_completed, 
        starting_amount: @starting_amount, 
        inventory_item_id: @inventory_item_id,
        roast_size: params[:roast_size],
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
