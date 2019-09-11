class LotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_lot, only: [:show]
  before_action :set_roaster_profile, only: [:show, :index]

  def index
    @lots = ActiveModelSerializers::SerializableResource.new(@roaster.lots, each_serializer: LotSerializer)
  end

  def show
    @lot = ActiveModelSerializers::SerializableResource.new(@lot, serializer: LotSerializer::SingleLotSerializer)
  end

  private

  def set_roaster_profile
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end

  def set_lot
    begin
      @lot = @roaster.lots.find(params[:id])  
    rescue => exception
      return render json: { error: "Lot not found", exception: exception, message: "Lot not found" }, status: 404
    end
    
  end
end
