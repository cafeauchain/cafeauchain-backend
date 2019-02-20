class Api::V1::InventoryItemsController < ApplicationController
  before_action :set_roaster

  def index
    @items = InventoryItem.all
    render json: @items, status: 200
  end

  private

  def set_roaster
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end
end
