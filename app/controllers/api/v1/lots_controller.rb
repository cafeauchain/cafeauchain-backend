module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster
    before_action :set_lot, only: [:show, :update]

    def index
      @lots = @roaster.lots
      render json: @lots, status: 200
    end

    def lots_by_date
      period = params[:period] || :day
      beginning_of_month = Time.current.beginning_of_month
      end_of_month = beginning_of_month.end_of_month
      end_date = params[:end_date] || Date.today.strftime("%F")
      range = params[:start_date] ? (params[:start_date]..end_date) : (beginning_of_month..end_of_month)
      @lots = @roaster.lots
      render json: @lots, range: range, period: period, status: 200, each_serializer: LotSerializer::LotsByDateSerializer
    end

    def earliest
      if @roaster.batches.nil?
        @earliest = @roaster.batches.order(:roast_date).limit(1).first.roast_date
      else
        @earliest = @roaster.created_at.to_date
      end
      render json: {data: @earliest}, status: 200
    end

    def show
      render json: @lot, status: 200, serializer: LotSerializer::SingleLotSerializer
    end

    def create
      @lot = InventoryServices::CreateLot.new(@roaster.id, params[:lotDetails][:crop_id], params)
      if @lot.call
        render json: @lot, status: 200
      else
        render @lot.errors, status: 422
      end
    end

    def update
      if params[:lotDetails].present? && params[:lotDetails][:accept_delivery].present?
        LedgerServices::AssetDeliveryTransaction.new(params[:lotDetails][:quantity], @lot.id, @roaster.id).call
      else
        @lot.update(lot_params)
      end
      render json: @lot, status: 200, serializer: LotSerializer::SingleLotSerializer
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
        render json: @roaster.lots, status: 200
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

    def lot_params
      params.permit(:name, :label, :pounds_of_coffee, :price_per_pound, :low_on_hand, :low_remaining, :on_hand_alert, :warehouse_alert)
    end
    
  end
end
