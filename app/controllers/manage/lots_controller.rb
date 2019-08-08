module Manage
  class LotsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_lot, only: [:show]
    before_action :set_roaster_profile, only: [:show, :index]

    def index
      @lots = ActiveModel::SerializableResource.new(@roaster.open_lots, each_serializer: LotSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        lots: @lots,
        component: "lots",
        title: "View Lots"
      }
    end

    def show
      @lot = ActiveModel::SerializableResource.new(@lot, serializer: LotSerializer::SingleLotSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        lot: @lot,
        component: "lots/single",
        title: "View Lot"
      }
    end

    private

    def set_roaster_profile
      @roaster = current_user.roaster_profile
    end

    def set_lot
      @lot = Lot.find(params[:id])
    end
  end
end
