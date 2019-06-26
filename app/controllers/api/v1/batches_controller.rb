module Api::V1
  class BatchesController < ApplicationController
    before_action :set_roaster
    before_action :set_batch, only: [:show, :update]
    before_action :set_lot, only: [:create]

    def index
      if params[:status].present?
        case params[:status]
        when "queued"
          status = 0
        when "in_progress"
          status = 1
        when "completed"
          status = 2
        when "bagged"
          status = 3
        else
          status = 1
        end
        @batches = @roaster.batches.where(status: status)
      else
        @batches = @roaster.batches
      end
      render json: @batches, status: 200
    end

    def show
      render json: @batch, status: 200
    end

    def create
      @batch = InventoryServices::StartBatchRoast.start(@lot.id, params[:starting_amount], params[:roast_date], params[:inventory_item_id], params[:roast_count], params[:roast_size])
      if @batch.errors.full_messages.empty?
        subscription = @roaster.owner.subscription
        StripeServices::UpdateQuantifiedSubscription.update(@roaster.owner.id, subscription.id)
        render json: {"redirect":false,"refresh_parent": true,"redirect_url": manage_inventory_path}, status: 200
      else
        render json: { data: @batch.errors.full_messages }, status: 422
      end
    end

    def update
      # Finish Batch
      if !params[:finish_batch].nil?
        @batch = InventoryServices::FinishBatchRoast.finish(@batch.id, batch_params)
        @inventory_item = InventoryServices::AddRoastToInventory.call(@batch.inventory_item, params[:ending_amount])
        if @inventory_item.errors.full_messages.empty?
          if @batch.errors.full_messages.empty?
            render json: {
              "batch": @batch,
              "inventory_item": @inventory_item
            }, status: 200
          else
            render json: @batch.errors.full_messages, status: 422
          end
        else
          render json: @inventory_item.errors.full_messages, status: 422
        end
      # Update Batch
      else
        if @batch.update!(batch_params)
          render json: @batch, status: 200
        else
          render json: @batch.errors.full_messages, status: 422
        end
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

    def batch_params
      params.permit(:roast_date, :starting_amount, :ending_amount, :target_weight, :status, :roast_size, :roast_count)
    end
  end
end
