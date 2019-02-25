module Api::V1
  class CartsController < ApplicationController
    before_action :set_cart
    
    def update
      params[:cart_items].each do |cart_item|
        @card.add_to_cart(cart_item[:product_variant_id], cart_item[:quantity])
      end
      render json: {"redirect":false, data: @cart}, status: 200
    end
    
    private

    def set_cart
      begin
        @cart = Cart.find(session[:cart_id])
      rescue ActiveRecord::RecordNotFound
        @cart = current_user.customer_profile.wholesale_profile.cart.create
      end
      session[:cart_id] = @cart.id
    end
  end
end