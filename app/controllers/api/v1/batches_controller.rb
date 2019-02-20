module Api::V1
  class BatchesController < ApplicationController
    before_action :set_roaster
    before_action :set_batch, only: [:show, :update]
    before_action :set_lot, only: [:create]

    def index
      @batches = @roaster.batches.where(status: :roast_in_progress)
      render json: @batches, status: 200
    end

    def show
      render json: @batch, status: 200
    end

    def create
      @batch = InventoryServices::StartBatchRoast.start(@lot.id, params[:starting_amount], params[:roast_date])
      if @batch.errors.full_messages.empty?
        subscription = @roaster.owner.subscription
        StripeServices::UpdateQuantifiedSubscription.update(@roaster.owner.id, subscription.id)
        render json: {"redirect":false,"refresh_parent": true,"redirect_url": manage_inventory_roaster_profile_path(@roaster)}, status: 200
      else
        render json: { data: @batch.errors.full_messages }, status: 422
      end
    end

    def update
      @batch = InventoryServices::FinishBatchRoast.finish(@batch.id, params[:ending_amount])
      @inventory_item = InventoryServices::AddRoastToInventory.call(@batch.lot_id, params[:ending_amount])
      if @inventory_item.errors.full_messages.empty?
        if @batch.errors.full_messages.empty?
          render json: {
            "redirect":false,
            "refresh_parent": true,
            "redirect_url": manage_inventory_roaster_profile_path(@roaster),
            "batch": @batch,
            "inventory_item": @inventory_item
          }, status: 200
        else
          render json: @batch.errors.full_messages, status: 422
        end
      else
        render json: @inventory_item.errors.full_messages, status: 422
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
