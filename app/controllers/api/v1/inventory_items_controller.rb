class Api::V1::InventoryItemsController < ApplicationController
  before_action :set_roaster
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

  private

  def set_lot
    @lot = Lot.find(params[:lot_id])
  end

  def set_roaster
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end
end
