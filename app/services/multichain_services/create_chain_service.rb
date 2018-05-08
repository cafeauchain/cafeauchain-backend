require "faraday"
require "multichain"

module MultichainServices
  class CreateChainService
    def initialize(farm_slug, network_port, rpc_port)
      @farm_slug = farm_slug
      @connection = Faraday.new(Rails.application.secrets.host)
      @network_port = network_port
      @rpc_port = rpc_port
    end

    def call
      @connection.get("/createchain?chainname=#{@farm_slug}&networkport=#{@network_port}&rpcport=#{@rpc_port}")
    end
    
    private

  end
end