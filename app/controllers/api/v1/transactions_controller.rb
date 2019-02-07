module Api::V1
  class TransactionsController < ApplicationController
    before_action :set_roaster

    def index
      @limit = params[:limit] ? params[:limit] : 10
      @transactions = @roaster.transactions.filter(params.slice(:trans_type, :order_by)).limit(@limit)
      render json: @transactions, status: 200
    end

    private

    def set_roaster
      @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end
  end
end
