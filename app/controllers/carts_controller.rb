class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @serialized_cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    render "manage/primary", locals: {
      roaster: current_roaster,
      title: 'Products',
      component: 'shop/cart',
      cart: @serialized_cart
    }
  end

end
