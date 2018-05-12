require "multichain"

module MultichainServices
  class GetNodeAddressService

    def initialize(farm_slug, rpc_port)
      @farm_slug = farm_slug
      @rpc_port = rpc_port
    end

    def call
      m = Multichain::Client.new("multichainrpc", "thisisatest", Rails.application.secrets.host, @rpc_port)
      response = m.getaddresses
      return response["result"].first
    end
  end
end