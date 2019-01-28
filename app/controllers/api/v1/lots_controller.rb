module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster

    def create
      @lot = InventoryServices::CreateLot.new(@roaster.id, params[:crop_id], params)
      if @lot.call
        render json: {"redirect":true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200, status: 200
      else
        render @lot.errors, status: 422
      end
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end
  end
end