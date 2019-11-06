module Api::V1
  class CartsController < ApplicationController
    before_action :set_cart

    def index
      render json: @cart
    end

    def create
      options = params[:option].split(",")
      @item = OrderServices::CreateCartItem.create(@cart.id, params[:id], params[:quantity], options)
      render json: {item: @item, items: @cart.cart_items, cart: @cart }
    end

    def update
      @item = OrderServices::CreateCartItem.update(params[:id], params[:quantity])
      render json: {data: @cart}
    end

    def destroy
      CartItem.find(params[:id]).destroy
      render json: {data: @cart}
    end

  end
end
