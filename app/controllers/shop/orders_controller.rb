module Shop
  class OrdersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_cart
    before_action :set_order, only: [:show]
    before_action :serialize_cart

    def show
      order = ActiveModel::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
      @roaster = ActiveModel::SerializableResource.new(current_roaster, serializer: RoasterSerializer)
      @customer = ActiveModel::SerializableResource.new(current_user.customer_profile, serializer: CustomerSerializer, scope: current_roaster)
      render "customer/base", locals: {
        roaster: @roaster,
        order: order,
        customer: @customer,
        cart: @serialized_cart,
        # invoice: @order.invoice, 
        stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
        cards: current_user.customer_profile.cards,
        scripts: ["https://js.stripe.com/v3/"],
        title: 'Order',
        component: 'shop/order'
      }
    end

    def index
      orders = current_user.customer_profile.wholesale_profiles.find_by(roaster_profile: current_roaster).orders
      @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
      render "customer/base", locals: {
        roaster: current_roaster,
        orders: @orders,
        cart: @serialized_cart,
        title: 'Orders',
        component: 'shop/orders'
      }
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

    def serialize_cart
      @serialized_cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    end

  end
end
