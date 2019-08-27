class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
    wp = current_user.customer_profile.wholesale_profiles.find_by(roaster_profile: current_roaster)
    @customer = current_user.customer_profile
    # TODO Once shipping is working correctly, handle the customers default setting
    # shipping_method = ShippingMethod.find(wp.shipping)
    @rates = ShippingServices::GetRates.get_rate_estimates(@cart.id, wp.id)
    @local_rates = ShippingServices::GetLocalRates.get_rates(current_roaster)
    @all_rates = (@rates + @local_rates).sort_by{|ar| ar[:retail_rate].to_f}
    @profile = ActiveModelSerializers::SerializableResource.new(@customer, serializer: CustomerSerializer, scope: current_roaster)
    @cards = @customer.cards

    render "customer/base", locals: {
      profile: @profile,
      rates: @all_rates,
      cards: @cards,
      stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
      scripts: ["https://js.stripe.com/v3/"],
      roaster: current_roaster,
      title: 'Cart',
      component: 'shop/cart',
      cart: @serialized_cart
    }
  end

end
