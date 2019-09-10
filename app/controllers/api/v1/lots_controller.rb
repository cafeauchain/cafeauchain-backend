module Api::V1
  class LotsController < ApplicationController
    before_action :set_roaster
    before_action :set_lot, only: [:show, :update, :destroy]

    def index
      @lots = @roaster.open_lots
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
      elsif params[:adjustment].present?
        if params[:adjustment].to_f <= 0
          @lot.errors.add(:adjustment, "cannot be negative")
        elsif params[:adjustment].to_f > @lot.coffee_on_hand.to_f
          @lot.errors.add(:adjustment, "cannot be more than amount on hand")
        else
          LedgerServices::ManualAdjustmentTransaction.new(params[:adjustment].to_f, @lot.id, @roaster.id).call
        end
      else
        @lot.update(lot_params)
      end

      if @lot.errors.empty?
        render json: @lot, status: 200, serializer: LotSerializer::SingleLotSerializer
      else
        render json: @lot.errors.full_messages, status: 409
      end
    end

    def destroy
      if @lot.can_delete
        @lot.destroy
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
      validate_roaster(RoasterProfile.friendly.find(params[:roaster_profile_id]))
    end

    def set_lot
      begin
        @lot = @roaster.lots.find(params[:id])  
      rescue => exception
        return render json: { error: "Lot not found", exception: exception, message: "Lot not found" }, status: 404
      end  
    end

    def lot_params
      params.permit(:name, :label, :pounds_of_coffee, :price_per_pound, :low_on_hand, :low_remaining, :on_hand_alert, :warehouse_alert)
    end
    
  end
end
