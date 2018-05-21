module LedgerServices
  class RecordTransaction
    
    def initialize(transaction_type, transaction_id, quantity, crop_id, roaster_id)
      @trans_type = transaction_type
      @tx_id = transaction_id
      @quantity = quantity
      @crop = Crop.find(crop_id)
      @roaster_id = roaster_id
    end

    def call
      @tx = @crop.transactions.create(quantity: @quantity, trans_type: @trans_type, tx_id: @tx_id, roaster_profile_id: @roaster_id)
      if @tx.save
        return "Success!"
      end
    end

  end
end