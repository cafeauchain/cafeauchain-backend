module Manage
  class ProductsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster_profile, only: [:show, :index]

    def index
      @products = ActiveModelSerializers::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        products: @products,
        component: "manage/products",
        title: "Products"
      }
    end

    private

    def set_roaster_profile
      @roaster = current_user.roaster_profile
    end
  end
end
