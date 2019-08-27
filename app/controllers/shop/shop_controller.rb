module Shop
  class ShopController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_cart

    def index
      @products = ActiveModelSerializers::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
      render "customer/base", locals: {
        roaster: @roaster,
        products: @products,
        body_class: "customer",
        title: 'Products',
        component: 'shop',
        cart: @serialized_cart
      }
    end

    private

    def set_roaster
      @roaster = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
