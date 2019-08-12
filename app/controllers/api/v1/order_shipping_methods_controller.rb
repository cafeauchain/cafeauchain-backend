module Api::V1
  class OrderShippingMethodsController < ApplicationController

    def update
      shipping_method = OrderShippingMethod.find(params[:id])
      if !params[:tracking_number].nil?
        tracker = ShippingServices::AddTracker.add(params[:tracking_number], params[:carrier], shipping_method)
        if !tracker
          shipping_method.errors.add(:tracking_code, "was not saved correctly")
        end
      else
        shipping_method.update(carrier: params[:carrier], service: params[:service], final_rate: params[:retail_rate])
        invoice = shipping_method.order.invoice
        shipping = params[:retail_rate].to_f
        invoice.update(shipping: shipping)
      end
      
      if shipping_method.errors.empty?
        render json: shipping_method, status: 200
      else
        render json: shipping_method.errors.full_messages, status: 409
      end
    end
  end
end