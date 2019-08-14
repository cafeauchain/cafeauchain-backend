module Api::V1
  class OrderShippingMethodsController < ApplicationController

    def update
      order_shipping_method = OrderShippingMethod.find(params[:id])
      if !params[:tracking_number].nil?
        tracker = ShippingServices::AddTracker.add(params[:tracking_number], params[:carrier])
        if !tracker[:id].nil?
          tracker_time = tracker[:tracking_details].length > 0 ? tracker[:tracking_details][0][:datetime] : Time.now()
          order_shipping_method.update(
                tracking_number: tracker[:tracking_code], 
                carrier: tracker[:carrier], 
                easypost_tracker_id: tracker[:id],
                shipment_date: tracker_time
            )
          order_shipping_method.order.update(status: :shipped)
        else
          order_shipping_method.errors.add(:tracking_error, " - " + tracker[:message])
        end
      else
        order_shipping_method.update(carrier: params[:carrier], service: params[:service], final_rate: params[:retail_rate])
        invoice = order_shipping_method.order.invoice
        shipping = params[:retail_rate].to_f
        invoice.update(shipping: shipping)
      end
      
      if order_shipping_method.errors.empty?
        render json: order_shipping_method, status: 200
      else
        render json: order_shipping_method.errors.full_messages, status: tracker[:status] || 409
      end
    end
  end
end