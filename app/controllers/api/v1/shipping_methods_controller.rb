module Api::V1
  class ShippingMethodsController < ApplicationController
    before_action :set_roaster

    def index
      @shipping_methods = @roaster.shipping_methods
      render json: @shipping_methods, status: 200
    end

    def create
      begin
        @shipping_method = ShippingServices::AddShippingMethod.add(params)
        render json: @shipping_method, status: 200
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
      
    end

    def get_rates
      @rates = ShippingServices::GetRates.get_rate_estimates(current_user.customer_profile.cart.id, params[:carrier])
      render json: @rates, status: 200
    end
    
    private

    def set_roaster
      @roaster = RoasterProfile.find(params[:roaster_profile_id])
    end
  end
end