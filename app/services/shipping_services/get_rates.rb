require 'easypost'

module ShippingServices
  class GetRates

    ############################
    # Returns an array:
    # [
    #   {
    #     "id": "rate_nyCb6ubX",
    #     "object": "Rate",
    #     "carrier_account_id": "ca_12345678",
    #     "service": "FirstClassPackageInternationalService",
    #     "rate": "9.50",
    #     "carrier": "USPS",
    #     "shipment_id": "shp_vN9h7XLn",
    #     "delivery_days": 4,
    #     "delivery_date": "2013-04-26T05:40:57Z",
    #     "delivery_date_guaranteed": false,
    #     "created_at": "2013-04-22T05:40:57Z",
    #     "updated_at": "2013-04-22T05:40:57Z"
    #   }, {
    #     "id": "rate_uJh8iO2n",
    #     "object": "Rate",
    #     "carrier_account_id": "ca_12345678",
    #     "service": "PriorityMailInternational",
    #     "rate": "27.40",
    #     "carrier": "USPS",
    #     "shipment_id": "shp_vN9h7XLn",
    #     "delivery_days": 2,
    #     "delivery_date": "2013-04-24T05:40:57Z",
    #     "delivery_date_guaranteed": false,
    #     "created_at": "2013-04-22T05:40:57Z",
    #     "updated_at": "2013-04-22T05:40:57Z"
    #   }, {
    #     "id": "rate_oZqapNpE",
    #     "object": "Rate",
    #     "carrier_account_id": "ca_12345678",
    #     "service": "ExpressMailInternational",
    #     "rate": "35.48",
    #     "carrier": "USPS",
    #     "shipment_id": "shp_vN9h7XLn",
    #     "delivery_days": 1,
    #     "delivery_date": "2013-04-23T05:40:57Z",
    #     "delivery_date_guaranteed": true,
    #     "created_at": "2013-04-22T05:40:57Z",
    #     "updated_at": "2013-04-22T05:40:57Z"
    #   }
    # ]

    def self.get_rate_estimates(cart_id, wholesale_profile_id)
      EasyPost.api_key = Rails.application.credentials[Rails.env.to_sym][:easypost_api_key]

      cart = Cart.find(cart_id)
      wholesale_profile = WholesaleProfile.find(wholesale_profile_id) 
      roaster = wholesale_profile.roaster_profile
      customer = wholesale_profile.customer_profile

      carrier_accounts = ShippingMethod.where(roaster_profile: roaster).map {|sm| sm.easy_post_account_ref}

      to_address = to_address(customer)
      from_address = from_address(roaster)
      # parcel = create_parcel(shipping_method.carrier, cart)
      parcel = create_new_parcel(cart)

      shipment = EasyPost::Shipment.create(
        to_address: to_address,
        from_address: from_address,
        parcel: parcel,
        carrier_accounts: carrier_accounts
      )
      cart.update(easypost_shipment_id: shipment.id)
      rates = shipment.rates
    end

    def self.create_new_parcel(order)
      parcel = EasyPost::Parcel.create(
          weight: order.total_weight.to_f + 16,
          length: 12,
          width: 12,
          height: 9
        )
    end

    def self.create_parcel(carrier, order)
      case carrier
      when "usps"
        parcel = EasyPost::Parcel.create(
          predefined_package: 'Parcel',
          weight: order.total_weight
        )
      when "ups"
        parcel = EasyPost::Parcel.create(
          predefined_package: 'LargeExpressBox',
          weight: order.total_weight
        )
      when "fedex"
        parcel = EasyPost::Parcel.create(
          predefined_package: 'FedExLargeBox',
          weight: order.total_weight
        )
      else
        raise "Unknown carrier type"
      end
    end

    def self.to_address(customer)
      to_address = EasyPost::Address.create(
        name: customer.company_name,
        street1: customer.primary_address.street_1,
        street2: customer.primary_address.street_2,
        city: customer.primary_address.city,
        state: customer.primary_address.state,
        zip: customer.primary_address.postal_code
      )
      
    end

    def self.from_address(roaster)
      from_address = EasyPost::Address.create(
        name: roaster.name,
        street1: roaster.primary_address.street_1,
        street2: roaster.primary_address.street_2,
        city: roaster.primary_address.city,
        state: roaster.primary_address.state,
        zip: roaster.primary_address.postal_code
      )
    end
    
  end
end