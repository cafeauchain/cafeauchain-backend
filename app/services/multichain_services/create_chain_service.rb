require "faraday"
require "multichain"

module MultichainServices
  class CreateChainService
    def initialize(farm_slug, network_port, rpc_port)
      @farm_slug = farm_slug
      @connection = Faraday.new("http://#{Rails.application.secrets.host}")
      @network_port = network_port
      @rpc_port = rpc_port
    end

    def call
      response = @connection.get("/createchain?chainname=#{@farm_slug}&networkport=#{@network_port}&rpcport=#{@rpc_port}")
    end

  end
end