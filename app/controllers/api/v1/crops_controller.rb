module Api::V1
  class CropsController < ApplicationController
    before_action :set_producer
    
    def index
      @crops = @producer.crops
      render json: @crops, status: 200
    end

    def create
      @producer = ProducerProfile.find(params[:producer_id])
      @crop = @producer.crops.new(name: params[:crop_name])
      if @crop.save
        render json: @crop, status: 200
      else
        render json: @crop.errors, status: 422
      end
    end

    private

    def set_producer
      @producer = ProducerProfile.friendly.find(params[:producer_profile_id])
    end
    
  end
end