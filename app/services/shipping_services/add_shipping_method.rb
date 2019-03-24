module ShippingServices
  class AddShippingMethod

    def self.add(params)
      roaster = RoasterProfile.find(params[:roaster_id])
      carrier = params[:carrier].parameterize # string -> "ups", "usps", "fedex", "pick up", "local delivery"

      if carrier == "usps" || carrier == "ups" || carrier == "fedex"
        shipping_method = ShippingServices::AddCarrierAccount(params, roaster.id)
      else
        shipping_method = roaster.shipping_methods.create(carrier: carrier, rate: params[:rate], friendly_name: params[:friendly_name], flat_rate: true)
      end
    end
  end
end