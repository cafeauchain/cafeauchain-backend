module Api::V1
  class DefaultOptionsController < ApplicationController
    before_action :set_roaster

    def index
      @options = VariantOption.where(roaster_profile_id: @roaster_profile.id )
      render json: @options, status: 200
    end

    def create
      @option = VariantOption.create(title: params[:title], options: params[:options], roaster_profile_id: @roaster_profile.id)
      render json: @option, status: 200
    end

    private

    def set_roaster
      @roaster_profile = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end


  end
end
