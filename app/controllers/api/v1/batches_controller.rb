module Api::V1
  class BatchesController < ApplicationController
    before_action :set_roaster
    before_action :set_batch, only: [:show, :update, :destroy]
    before_action :set_lot, only: [:create]

    def index      
      @batches = @roaster.batches
      if params[:status].nil?
        @batches = @batches.where(status: :roast_in_progress)
      else
        @batches = @batches.filter(params.slice(:status))
      end
      
      render json: @batches, status: 200
    end

    def show
      render json: @batch, status: 200
    end

    def create
      @batch = InventoryServices::StartBatchRoast.start(@lot.id, batch_params)
      if @batch.errors.full_messages.empty?
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
            StripeServices::UpdateQuantifiedSubscription.update(@roaster.owner.id)
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

    def destroy
      if params[:status] != "roast_completed"
        
        if @batch.destroy!
          render json: @batch, status: 200
        end
      end 
    end


    private

    def set_roaster
      validate_roaster(RoasterProfile.friendly.find(params[:roaster_profile_id]))
    end

    def set_lot
      begin
        @lot = @roaster.lots.find(params[:lot_id])  
      rescue => exception
        return render json: { error: "Lot not found", exception: exception }, status: 404
      end
    end

    def set_batch
      begin
        @batch = @roaster.batches.find(params[:id])
      rescue => exception
        return render json: { error: "Batch not found", exception: exception }, status: 404
      end
    end

    def batch_params
      params.permit(:roast_date, :starting_amount, :ending_amount, :status, :roast_size, :inventory_item_id)
    end
  end
end
