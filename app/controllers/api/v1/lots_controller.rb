module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster

    def create
      @lot = InventoryServices::CreateLot.new(@roaster.id, params[:crop_id], params)
      if @lot.call
        render json: {"redirect":true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
      else
        render @lot.errors, status: 422
      end
    end

    def upload_csv
      @errors = []
      @lots = JSON.parse(params[:lots])
      @lots.each do |lot|
        @import = ImportServices::ImportLots.import(@roaster.id, lot)
        if !@import[:errors].nil?
          @errors << @import[:errors]
        end
      end
      if @errors.empty?
        render json: {"redirect":true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
      else
        render @errors, status: 422
      end
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end
  end
end