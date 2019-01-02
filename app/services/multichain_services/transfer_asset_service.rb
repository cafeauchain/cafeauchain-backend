module MultichainServices
  class TransferAssetService
    
    def initialize(roaster_id, producer_id, crop_id, quantity)
      @producer = ProducerProfile.find(producer_id)
      @crop = Crop.find(crop_id)
      @roaster = RoasterProfile.find(roaster_id)
      @quantity = quantity
      @rpc_port = @producer.rpc_port
      @roaster_wallet = @roaster.wallets.where(producer_profile_id: @producer.id).first.roaster_wallet
    end

    def call
      m = Multichain::Client.new("multichainrpc", "thisisatest", Rails.application.secrets.host, @rpc_port)
      response = m.sendassetfrom([@producer.wallet_address, @roaster_wallet, @crop.bag_size, @quantity])
      if response["error"].nil?
        ::LedgerServices::RecordTransaction.new(:asset_transfer, response["result"], @quantity, @crop.id, @roaster.id).call
      else
        return response["error"]
      end
    end
  end
end