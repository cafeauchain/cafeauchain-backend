class CartController < ApplicationController
  before_action :set_cart
  def index
    @cart = ActiveModel::SerializableResource.new(@cart, serializer: CartSerializer)
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
end
