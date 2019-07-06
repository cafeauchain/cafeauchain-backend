module Api::V1
  class CutoffsController < ApplicationController
    before_action :set_roaster

    def index
      @cutoff = @roaster_profile.cutoff
      render json: @cutoff, status: 200
    end

    def update
      @cutoff = Cutoff.find(params[:id]).tap{|c| c.update(cutoff_params)}
      render json: @cutoff, status: 200
    end

    private

    def set_roaster
      @roaster_profile = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end

    def cutoff_params
      params.permit(:day_0, :day_1, :day_2, :day_3, :day_4, :day_5, :day_6)
    end

  end
end
