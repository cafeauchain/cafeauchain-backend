class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @serialized_cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    wp = current_user.customer_profile.wholesale_profiles.find_by(roaster_profile: current_roaster)
    @customer = current_user.customer_profile
    # TODO Once shipping is working correctly, handle the customers default setting
    # shipping_method = ShippingMethod.find(wp.shipping)
    @rates = ShippingServices::GetRates.get_rate_estimates(@cart.id, wp.id)
    @profile = ActiveModel::SerializableResource.new(@customer, serializer: CustomerSerializer, scope: current_roaster)

    render "manage/primary", locals: {
      profile: @profile,
      rates: @rates,
      header_info: {url: current_roaster.logo_image_url, name: current_roaster.name},
      roaster: current_roaster,
      title: 'Products',
      component: 'shop/cart',
      cart: @serialized_cart
    }
  end

end
