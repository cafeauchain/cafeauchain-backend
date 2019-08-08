module LedgerServices
  class ManualAdjustmentTransaction
    
    def initialize(quantity, lot_id, roaster_id)
      @quantity = quantity
      @lot = Lot.find(lot_id)
      @roaster = RoasterProfile.find(roaster_id)
    end

    def call
      @tx = @lot.transactions.new(quantity: @quantity, trans_type:"adjustment", roaster_profile: @roaster)
      if @tx.save
        return "Success!"
      else
        return @tx.errors
      end
    end
    
  end
end