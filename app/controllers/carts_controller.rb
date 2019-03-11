class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    render "manage/primary", locals: {
      roaster: current_roaster,
      products: @products,
      title: 'Products',
      component: 'shop/cart',
      cart: @ser_cart
    }
  end

end
