require 'easypost'

module ShippingServices
  class AddTracker

    def self.add(tracking_code, carrier, order_shipping_method)
        EasyPost.api_key = Rails.application.credentials[Rails.env.to_sym][:easypost_api_key]

        tracker = EasyPost::Tracker.create({
            tracking_code: tracking_code,
            carrier: carrier
        })

        if tracker
            order_shipping_method.update(
                tracking_number: tracking_code, 
                carrier: carrier, 
                easypost_tracker_id: tracker[:id],
                shipment_date: Time.now()
            )
            order_shipping_method.order.update(status: :shipped)
            return true
        else
            return false
        end
    end
    
  end
end