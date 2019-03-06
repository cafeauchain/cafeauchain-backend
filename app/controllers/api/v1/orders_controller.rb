module Api::V1
  class OrdersController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_order, only: [:show]

    def create
      @roaster = current_roaster
      @wholesale_profile = @cart.wholesale_profile
      @order = Order.create(status: :draft, wholesale_profile_id: @wholesale_profile.id)
      @cart.cart_items.each do |ci|
        pv = ProductVariant.find(ci.product_variant_id)
        # TODO This is probably a terrible idea and shouldnt be done
        @order.order_items.create(product_variant_id: pv.id, quantity: ci.quantity, line_item_cost: (ci.quantity * pv.price_in_cents), id: SecureRandom.uuid )
      end
      if @order.update(status: :processing)
        @cart.cart_items.destroy_all
      end
      render json: {redirect_url: order_path(@order), redirect: true}, status: 200
    end

    def show
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
