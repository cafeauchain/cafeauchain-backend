module Shop
  class ShopController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_cart

    def index
      @roaster = @roaster_profile
      @products = ActiveModel::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      @serialized_cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        products: @products,
        header_info: {url: @roaster_profile.logo_image_url, name: @roaster_profile.name},
        body_class: "customer",
        title: 'Products',
        component: 'shop',
        cart: @serialized_cart
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
