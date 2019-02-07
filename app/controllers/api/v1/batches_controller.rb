module Api::V1
  class BatchesController < ApplicationController
    before_action :set_roaster
    before_action :set_batch, only: [:show, :update]
    before_action :set_lot, only: [:create]

    def index
      period = params[:period] || :day
      @batches = InventoryServices::BatchGrouping.group(@roaster.batches, period)
      render json: @batches, status: 200
    end

    def show
      render json: @batch, status: 200
    end

    def create
      @batch = @lot.batches.create(starting_amount: params[:starting_amount], ending_amount: params[:ending_amount])
      if @batch.save
        @tx = LedgerServices::RoastTransaction.new(params[:starting_amount], @batch.id, @roaster.id)
        if @tx.call
            render json: {"redirect":false,"refresh_parent": true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
        else
          render @tx.errors, status: 422
        end
      else
        render @batch.errors, status: 422
      end
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end

    def set_lot
      @lot = Lot.find(params[:lot_id])
    end

    def set_batch
      @batch = Batch.find(params[:id])
    end
  end
end
