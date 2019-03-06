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
      options = params[:option].split(",")
      @item = OrderServices::CreateCartItem.update(params[:id], params[:quantity], params[:notes])
      # @cart.add_to_cart(params[:id], params[:quantity], options, params[:notes])
      # I'm might be doing this wrong but I'm adding/updating each cart item individually
      # So instead of a cart_items param that is an array of all cart_items, I am sending individual requests for each one
      # params[:cart_items].each do |cart_item|
      #   @cart.add_to_cart(cart_item[:product_variant_id], cart_item[:quantity])
      # end
      render json: {"redirect":false, data: @cart}, status: 200
    end

    def destroy
      CartItem.find(params[:id]).destroy
      render json: {"redirect": false, data: @cart}, status: 200
    end

    private

    def set_cart
      @cart = current_user.cart(current_roaster)
    end
  end
end
