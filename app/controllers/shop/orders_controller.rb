module Shop
  class OrdersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_cart
    before_action :set_order, only: [:show]
    before_action :serialize_cart

    def show
      order = ActiveModelSerializers::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
      @roaster = ActiveModelSerializers::SerializableResource.new(current_roaster, serializer: RoasterSerializer)
      @customer = ActiveModelSerializers::SerializableResource.new(current_user.customer_profile, serializer: CustomerSerializer, scope: current_roaster)
      render "customer/base", locals: {
        roaster: @roaster,
        order: order,
        customer: @customer,
        cart: @serialized_cart,
        stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
        cards: current_user.customer_profile.cards,
        scripts: ["https://js.stripe.com/v3/"],
        title: 'Order',
        component: 'shop/order'
      }
    end

    def index
      orders = current_user.customer_profile.wholesale_profiles.find_by(roaster_profile: current_roaster).orders
      @orders = ActiveModelSerializers::SerializableResource.new(orders, each_serializer: OrderSerializer)
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
      wp = @order.wholesale_profile
      same_roaster = wp.roaster_profile_id == current_roaster.id
      same_customer = wp.customer_profile_id == current_user.customer_profile_id
      if !same_roaster || !same_customer
        return redirect_to shop_orders_path
      end
    end

    def serialize_cart
      @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
    end

  end
end
