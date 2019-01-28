module Api::V1
  class ProducerProfilesController < ApplicationController
    
    def index
      @producers = ProducerProfile.all
      render json: @producers, status: 200
    end
  end
end