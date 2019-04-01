class LotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_lot, only: [:show]
  before_action :set_roaster_profile, only: [:show, :index]

  def index
    @lots = ActiveModel::SerializableResource.new(@roaster_profile.lots, each_serializer: LotSerializer)
    # render component: 'lots', props: { lots: @lots }
  end

  def show
    @lot = ActiveModel::SerializableResource.new(@lot, serializer: LotSerializer::SingleLotSerializer)
    # render component: 'lots', props: @lot
  end

  private

  def set_roaster_profile
    @roaster_profile = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end

  def set_lot
    @lot = Lot.find(params[:id])
  end
end
