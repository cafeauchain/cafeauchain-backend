module Api::V1
  class ProducerProfilesController < ApplicationController
    
    def index
      @producers = ProducerProfile.all
      render json: @producers, status: 200
    end

    def create
      @producer = ProducerProfile.new(producer_params)
      if @producer.save
        render json: @producer, status: 200
      else
        render json: {errors: @producer.errors}, status: 422
      end
    end

    private

    def producer_params
      params.require(:producer_profile).permit(:name)
    end
  end
end