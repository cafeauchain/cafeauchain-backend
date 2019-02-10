module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster
    before_action :set_lot, only: [:show, :update]

    def index
      period = params[:period] || :day
      beginning_of_month = Time.current.beginning_of_month
      end_of_month = beginning_of_month.end_of_month
      range = params[:range] || (beginning_of_month..end_of_month)
      @lots = @roaster.lots
      render json: @lots, range: range, period: period, status: 200
    end

    def show
      render json: @lot, status: 200
    end

    def create
      @lot = InventoryServices::CreateLot.new(@roaster.id, params[:lotDetails][:crop_id], params)
      if @lot.call
        render json: {"redirect":true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
      else
        render @lot.errors, status: 422
      end
    end

    def update
      if params[:lotDetails][:accept_delivery].present?
        LedgerServices::AssetTransferTransaction.new(params[:lotDetails][:quantity], @lot.id, @roaster.id).call
      elsif params[:lotDetails][:log_roast].present?
        # roast tx service
      else
        @lot.update(lot_params)
      end
      render json: {"redirect":false,"redirect_url": dashboard_roaster_profile_path(@roaster)}, status: 200
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
      @lot = Lot.find(params[:id])
    end
  end
end
