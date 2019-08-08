class Api::V1::InventoryItemsController < ApplicationController
  before_action :set_roaster
  before_action :set_inventory_item, only: [:update, :destroy]
  before_action :set_lot, only: [:create]

  def index
    @items = @roaster.inventory_items
    render json: @items, status: 200
  end

  def create
    @inventory_item = InventoryServices::CreateInventory.create(@lot.id, params)
    if @inventory_item.errors.full_messages.empty?
      render json: {
        "item": @inventory_item
      }, status: 200
    else
      render json: { data: @inventory_item.errors.full_messages }, status: 422
    end
  end

  def update
    renderError = false
    if params[:adjustment]
      if params[:quantity].to_f < 0
        @inventory_item.errors.add(:new_quantity, "cannot be negative")
        renderError = true
      elsif params[:quantity].to_f > @inventory_item[:quantity]
        @inventory_item.errors.add(:new_quantity, "cannot be more than the amount available")
        renderError = true
      end
    end
    
    if renderError
      render json: @inventory_item.errors.full_messages, status: 409
    else
      @inventory_item.update(inventory_item_params)
      render json: @inventory_item, status: 200, serializer: InventoryItemSerializer    
    end
  end

  def destroy
    if @inventory_item.can_delete
      @inventory_item.destroy
    end
    render json: @inventory_item, status: 200, serializer: InventoryItemSerializer
  end

  private

  def set_lot
    @lot = Lot.find(params[:lot_id])
  end

  def set_roaster
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end

  def set_inventory_item
    @inventory_item = InventoryItem.find(params[:id])
  end

  def inventory_item_params
      params.permit(:name, :lot_id, :par_level, :quantity, :roast_size, :shrinkage)
  end

end
