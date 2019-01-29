module LedgerServices
  class AssetIssueTransaction
    
    def initialize(quantity, crop_id, roaster_id)
      @quantity = quantity
      @crop = Crop.find(crop_id)
      @roaster_id = roaster_id
    end

    def call
      @tx = @crop.transactions.new(quantity: @quantity, trans_type:"asset_issue", roaster_profile_id: @roaster_id)
      if @tx.save
        return "Success!"
      else
        @tx.errors
      end
    end

  end
end