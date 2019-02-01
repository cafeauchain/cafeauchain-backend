module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster
    before_action :set_lot, only: [:show, :update]

    def index
      @lots = @roaster.lots
      render json: @lots, status: 200
    end

    def show
      render json: @lot, status: 200
    end

    def create
      @lot = InventoryServices::CreateLot.new(@roaster.id, params[:crop_id], params)
      if @lot.call
        render json: {"redirect":true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
      else
        render @lot.errors, status: 422
      end
    end

    def update
      case params
      when params[:accept_delivery].present?
        # Accept deliver tx service
      when params[:log_roast].present?
        # roast tx service
      else
        @lot.update(lot_params)
      end
    end

    def upload_lot_csv
      @errors = []
      @lots = params[:lots]
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

    def set_lot
      @lot = Lot.find_by(crop_id: params[:crop_id], roaster_profile_id: params[:roaster_profile_id])
    end
  end
end
