module LedgerServices
  class AssetTransferTransaction
    #####################
    # Asset transfers occur when the producer transfers coffee between the actors of the coffee supply chain.
    # 
    # It differs from an asset delivery, which is focused on a roaster taking possession of a fraction of their total lot from a distributor.
    #####################
    
    def initialize(quantity, lot_id, roaster_id)
      @quantity = quantity
      @lot = Lot.find(lot_id)
      @roaster = RoasterProfile.find(roaster_id)
    end

    def call
      @tx = @lot.transactions.new(quantity: @quantity, trans_type:"asset_transfer", roaster_profile: @roaster)
      if @tx.save
        return "Success!"
      else
        @tx.errors
      end
    end
  end
end