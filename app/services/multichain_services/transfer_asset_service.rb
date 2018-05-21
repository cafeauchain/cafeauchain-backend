module MultichainServices
  class TransferAssetService
    
    def initialize(roaster_wallet, producer_id, crop_id, quantity)
      @producer = ProducerProfile.find(producer_id)
      @crop = Crop.find(crop_id)
      @roaster_wallet = roaster_wallet
      @quantity = quantity
      @rpc_port = @producer.rpc_port
    end

    def call
      m = Multichain::Client.new("multichainrpc", "thisisatest", Rails.application.secrets.host, @rpc_port)
      response = m.sendassetfrom([@producer.wallet_address, @roaster_wallet, @crop.bag_size, @quantity])
      if response["error"].nil?
        ::LedgerServices::RecordTransaction.new(:assettx, response["result"], @quantity, @crop.id)
      else
        return response["error"]
      end
    end
  end
end