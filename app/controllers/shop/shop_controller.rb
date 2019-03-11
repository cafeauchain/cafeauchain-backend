module Shop
  class ShopController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_cart

    def index
      @roaster = @current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
      @products = ActiveModel::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        products: @products,
        title: 'Products',
        component: 'shop',
        cart: @ser_cart
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
