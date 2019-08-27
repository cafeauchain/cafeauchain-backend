module Api::V1
  class SubscriptionsController < ApplicationController
    before_action :set_roaster

    def index
      subscription = @roaster.owner.subscription
      subscription.update_subscription_details
      render json: subscription, status: 200
    end

    private

    def set_roaster
      validate_roaster(RoasterProfile.find(params[:roaster_profile_id]))
    end
  end
end