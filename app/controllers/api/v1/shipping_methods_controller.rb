module Api::V1
  class ShippingMethodsController < ApplicationController
    def index
      @shipping_methods = @roaster.shipping_methods
      render json: @shipping_methods, status: 200
    end

    def create
      @shipping_method = ShippingServices::AddShippingMethod(params, @roaster.id)
      render json: @shipping_method, status: 200
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