class CartsController < ApplicationController
  before_action :set_cart

  def index
  end

  private

  def set_cart
    if session[:cart_id].nil?
      @cart = current_user.customer_profile.wholesale_profiles.find_by(roaster_profile: current_roaster).create_cart
    else
      @cart = Cart.find(session[:cart_id])
    end
    session[:cart_id] = @cart.id
  end
  
end