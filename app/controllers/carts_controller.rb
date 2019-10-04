class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
    @customer = current_user.customer_profile
    cutoff_details = OrderServices::GetRoastDate.process(current_roaster, Time.now)
    # TODO Once shipping is working correctly, handle the customers default setting
    @profile = ActiveModelSerializers::SerializableResource.new(@customer, serializer: CustomerSerializer, scope: current_roaster)
    @cards = @customer.cards

    render "customer/base", locals: {
      profile: @profile,
      cards: @cards,
      next_cutoff: cutoff_details[:cutoff_time],
      next_roast_date: cutoff_details[:roast_date],
      stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
      scripts: ["https://js.stripe.com/v3/"],
      roaster: current_roaster,
      title: 'Cart',
      component: 'shop/cart',
      cart: @serialized_cart
    }
  end

end
