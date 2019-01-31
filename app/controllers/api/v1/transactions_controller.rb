module Api::V1
  class TransactionsController < ApplicationController
    before_action :set_roaster

    def index
      @transactions = @roaster.transactions
      render json: @transactions, status: 200
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end
  end
end