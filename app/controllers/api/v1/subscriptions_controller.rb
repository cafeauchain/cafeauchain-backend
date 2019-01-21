module Api::V1
  class SubscriptionsController < ApplicationController
    before_action :set_subscription, only: [:show]
    respond_to :json
    
    def show
      respond_with @subscription, status: 200
    end

    private

    def set_subscription
      @subscription = Subscription.find(params[:id])
    end
  end
end