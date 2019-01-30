module LedgerServices
  class RoastTransaction
    
    def initialize(quantity, batch_id, roaster_id)
      @quantity = quantity
      @batch = Batch.find(batch_id)
      @lot = @batch.lot
      @roaster = RoasterProfile.find(roaster_id)
    end

    def call
      @tx = @lot.transactions.new(quantity: @quantity, batch: @batch, trans_type:"roasted", roaster_profile: @roaster)
      if @tx.save
        return "Success!"
      else
        @tx.errors
      end
    end
    
  end
end