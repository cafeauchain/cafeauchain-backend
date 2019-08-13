require 'easypost'

module ShippingServices
  class AddTracker

    def self.add(tracking_code, carrier)
        EasyPost.api_key = Rails.application.credentials[Rails.env.to_sym][:easypost_api_key]
        begin
            tracker = EasyPost::Tracker.create({
                tracking_code: tracking_code,
                carrier: carrier
            })
            return tracker
        rescue => e
            return { message: e.message, status: e.http_status }
        end
    end
    
  end
end