module Manage
  class LotsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_lot, only: [:show]

    def index
      @lots = ActiveModelSerializers::SerializableResource.new(@roaster.open_lots, each_serializer: LotSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        lots: @lots,
        component: "lots",
        title: "View Lots"
      }
    end

    def show
      title = "View " + @lot[:name]
      @lot = ActiveModelSerializers::SerializableResource.new(@lot, serializer: LotSerializer::SingleLotSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        lot: @lot,
        component: "lots/single",
        title: title
      }
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

    def set_lot
      begin
        @lot = @roaster.lots.find(params[:id])  
      rescue
        redirect_to manage_lots_path
      end
      
    end
  end
end
