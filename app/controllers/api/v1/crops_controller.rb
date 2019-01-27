module Api::V1
  class CropsController < ApplicationController
    before_action :set_producer
    
    def index
      @crops = @producer.crops
      render json: @crops, status: 200
    end

    private

    def set_producer
      @producer = ProducerProfile.friendly.find(params[:producer_profile_id])
    end
    
  end
end