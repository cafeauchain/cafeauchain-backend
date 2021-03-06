class Api::V1::InventoryItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_roaster
  before_action :set_inventory_item, only: [:update, :destroy]
  before_action :set_lot, only: [:create]

  def index
    @items = @roaster.inventory_items.order('LOWER(inventory_items.name)')
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
    begin
      @lot = @roaster.lots.find(params[:lot_id])  
    rescue => exception
      return render json: { error: "Lot not found", exception: exception, message: "Lot not found" }, status: 404
    end
    
  end

  def set_roaster
    validate_roaster(RoasterProfile.friendly.find(params[:roaster_profile_id]))
  end

  def set_inventory_item
    begin
      @inventory_item = @roaster.inventory_items.find(params[:id])  
    rescue => exception
      return render json: { 
        error: "Inventory Item not found", 
        exception: exception, params: params, 
        message: "Inventory Item not found"
      }, status: 404
    end
  end

  def inventory_item_params
      params.permit(:name, :lot_id, :par_level, :quantity, :roast_size, :shrinkage)
  end

end
