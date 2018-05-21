module MultichainServices
  class CreateRoasterWalletService
    
    def initialize(roaster_id, producer_id)
      @roaster = RoasterProfile.find(roaster_id)
      @producer = ProducerProfile.find(producer_id)
      @rpc_port = @producer.rpc_port
    end

    def call
      m = Multichain::Client.new("multichainrpc", "thisisatest", Rails.application.secrets.host, @rpc_port)
      response = m.getnewaddress
      if response["error"].nil?
        wallet = response["result"]
        m.grant([wallet, "receive"])
        Wallet.create(roaster_profile: @roaster, producer_profile: @producer, roaster_wallet: wallet)
      else
        return response["error"]
      end
    end
  end
end