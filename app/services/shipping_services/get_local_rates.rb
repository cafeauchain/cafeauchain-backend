module ShippingServices
  class GetLocalRates

    def self.get_rates(current_roaster)
      # TODO Probably need to set a delivery radius when the roaster sets up the local deliver option
      current_roaster.shipping_methods.where(carrier: ['local_delivery', 'pick_up']).map do |lr|
        {
            id: lr.id,
            carrier: 'Local',
            service: lr.friendly_name,
            retail_rate: lr.rate,
            est_delivery_days: 1
        }
      end
    end
  end
end