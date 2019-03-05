module Api::V1
  class CartsController < ApplicationController
    before_action :set_cart

    def index
      render json: {data: {user: @user, cart: @cart, items: @cart.cart_items} }, status: 200
    end

    def create
      options = params[:option].split(",")
      @item = OrderServices::CreateCartItem.create(@cart.id, params[:id], params[:quantity], options, params[:notes])
      render json: {item: @item, items: @cart.cart_items, cart: @cart }, status: 200
    end

    def update
      options = params[:option].split(",")
      @item = OrderServices::CreateCartItem.update(params[:id], params[:quantity], options, params[:notes])
      # @cart.add_to_cart(params[:id], params[:quantity], options, params[:notes])
      # I'm might be doing this wrong but I'm adding/updating each cart item individually
      # So instead of a cart_items param that is an array of all cart_items, I am sending individual requests for each one
      # params[:cart_items].each do |cart_item|
      #   @cart.add_to_cart(cart_item[:product_variant_id], cart_item[:quantity])
      # end
      render json: {"redirect":false, data: @cart}, status: 200
    end

    def destroy
      CartItem.find_by(product_variant_id: params[:id]).destroy
      render json: {"redirect": false, data: @cart}, status: 200
    end

    private

    def set_cart
      @user = current_user;
      if @user.customer_profile_id.present?
        @cust_id = @user.customer_profile_id
        @whlsl_id = WholesaleProfile.find_by(customer_profile_id: @cust_id).id
        @cart = Cart.find_by(wholesale_profile_id: @whlsl_id)
      end
    end

    def set_cart_OLD
      begin
        @cart = Cart.find(session[:cart_id])
      rescue ActiveRecord::RecordNotFound
        @cart = current_user.customer_profile.wholesale_profile.cart.create
      end
      session[:cart_id] = @cart.id
    end
  end
end
