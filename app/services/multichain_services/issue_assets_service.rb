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
      check = m.listassets([@assetname])
      if check["result"].nil?
        response = m.issue([@wallet_address, {name: @assetname, open: true}, @quantity, 0.0001])
      else
        response = m.issuemore([@wallet_address, @assetname, @quantity])
      end
      if response["error"].nil?
        return response["result"]
      else
        return response["error"]
      end
    end
  end
end