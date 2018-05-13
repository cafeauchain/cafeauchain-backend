module MultichainServices
  class IssueAssetsService
    
    def initialize(rpc_port, wallet_address, assetname, quantity)
      @rpc_port = rpc_port
      @wallet_address = wallet_address
      @assetname = assetname
      @quantity = quantity
    end

    def call
      m = Multichain::Client.new("multichainrpc", "thisisatest", Rails.application.secrets.host, @rpc_port)
      response = m.issue([@wallet_address, {name: @assetname, open: true}, @quantity, 0.0001])
      if response["error"].nil?
        return response["result"]
      else
        return response["error"]
      end
    end
  end
end