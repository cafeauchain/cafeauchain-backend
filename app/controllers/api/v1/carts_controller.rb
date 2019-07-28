module Api::V1
  class CartsController < ApplicationController
    before_action :set_cart

    def index
      render json: @cart, status: 200
    end

    def create
      options = params[:option].split(",")
      @item = OrderServices::CreateCartItem.create(@cart.id, params[:id], params[:quantity], options, params[:notes])
      render json: {item: @item, items: @cart.cart_items, cart: @cart }, status: 200
    end

    def update
      @item = OrderServices::CreateCartItem.update(params[:id], params[:quantity], params[:notes])
      render json: {"redirect":false, data: @cart}, status: 200
    end

    def destroy
      CartItem.find(params[:id]).destroy
      render json: {"redirect": false, data: @cart}, status: 200
    end

    private
    # def set_cart
    #   @cart = current_user.cart(current_roaster)
    # end
  end
end
