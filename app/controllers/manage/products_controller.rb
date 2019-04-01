module Manage
  class ProductsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster_profile, only: [:show, :index]

    def index
      @products = ActiveModel::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        products: @products,
        component: "manage/products",
        title: "Products"
      }
    end

    # def show
    #   @lot = ActiveModel::SerializableResource.new(@lot, serializer: LotSerializer::SingleLotSerializer)
    #   render "manage/primary", locals: {
    #     roaster: @roaster,
    #     lot: @lot,
    #     component: "lots/single",
    #     title: "View Lot"
    #   }
    # end

    private

    def set_roaster_profile
      @roaster = current_user.roaster_profile
    end

    def set_lot
      @lot = Lot.find(params[:id])
    end
  end
end
