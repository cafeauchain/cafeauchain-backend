module LedgerServices
  class RecordTransaction
    
    def initialize(transaction_type, transaction_id, quantity, crop_id)
      @trans_type = transaction_type
      @tx_id = transaction_id
      @quantity = quantity
      @crop = Crop.find(crop_id)
    end

    def call
      @crop.transactions.create(quantity: @quantity, transaction_type: @trans_type, tx_id: @tx_id)
    end

  end
end