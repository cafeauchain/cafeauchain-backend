module ShippingServices
  class AddShippingMethod

    ########################
    # params = {
    #   roaster_id: 1,
    #   carrier: "pick up" || "pick_up",
    #   rate: 10.99,
    #   friendly_name: "Roaster Pick Up"
    # }
    # params = {
    #   roaster_id: 1,
    #   carrier: "ups",
    #   account_id: "alphanumericString",
    #   username: 'username', not stored
    #   password: 'password', not stored
    #   access_license_number: "if-ups123",
    #   meter_number: "if-fedexOptional"
    # }
    #######################

    def self.add(params)
      roaster = RoasterProfile.find(params[:roaster_profile_id])
      carrier = params[:carrier].parameterize # string -> "ups", "usps", "fedex", "pick up", "local delivery"

      if carrier == "usps" || carrier == "ups" || carrier == "fedex"
        shipping_method = ShippingServices::AddCarrierAccount.new(params, roaster.id).call
      else
        shipping_method = roaster.shipping_methods.create(carrier: carrier, rate: params[:rate], friendly_name: params[:friendly_name], flat_rate: true)
      end
    end
  end
end