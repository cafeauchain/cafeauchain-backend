module Api::V1
  class BatchesController < ApplicationController
    before_action :set_roaster

    def index
      @batches = @roaster.batches
      render json: @batches, status: 200
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end
  end
end
