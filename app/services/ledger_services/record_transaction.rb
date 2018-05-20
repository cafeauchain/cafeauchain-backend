module LedgerServices
  class RecordTransaction
    
    def initialize(transaction_type, transaction_id, quantity, crop_id)
      @trans_type = transaction_type
      @tx_id = transaction_id
      @quantity = quantity
      @crop = Crop.find(crop_id)
    end

    def call
      
    end

  end
end