module Api::V1
  class ShippingMethodsController < ApplicationController
    before_action :set_roaster, except: [:get_rates]

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

    def update
      shipping_method = OrderShippingMethod.find(params[:id])
      shipping_method.update(carrier: params[:carrier], service: params[:service], final_rate: params[:retail_rate])
      invoice = shipping_method.order.invoice
      shipping = params[:retail_rate].to_f
      invoice.update(shipping: shipping)
      if shipping_method.errors.empty?
        render json: shipping_method, status: 200
      else
        render json: shipping_method.errors.full_messages, status: 409
      end
    end

    def get_rates
      @order = Order.find(params[:order_id])
      @roaster = @order.roaster_profile
      @rates = ShippingServices::GetRates.get_rate_estimates(params[:order_id], params[:wholesale_profile_id], true)
      @local_rates = ShippingServices::GetLocalRates.get_rates(@roaster)
      @rates = @rates.concat(@local_rates)
      render json: @rates, status: 200
    end
    
    private

    def set_roaster
      validate_roaster(RoasterProfile.find(params[:roaster_profile_id]))
    end
  end
end