require "faraday"

module MultichainServices
  class CreateChainService
    def initialize(farm_slug, network_port, rpc_port)
      @farm_slug = farm_slug
      @connection = Faraday.new("http://34.234.13.133:5000")
      @network_port = network_port
      @rpc_port = rpc_port
    end

    def call
      response = @connection.get("/createchain?chainname=#{@farm_slug}&networkport=#{@network_port}&rpcport=#{@rpc_port)")
    end
    
    private

  end
end