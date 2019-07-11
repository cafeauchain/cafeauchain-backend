module Manage
  class OrdersController < ApplicationController
    before_action :authenticate_user!

    def new
      if params[:customer_profile_id].blank?
        render "manage/primary", locals: {
          component: "empty",
          title: "No Customer Selected"
        }
      else
        @roaster = current_user.roaster_profile
        wp = WholesaleProfile.where(roaster_profile: @roaster, customer_profile_id: params[:customer_profile_id]).first
        customer = wp.customer_profile
        @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
        @cart = Cart.find_by(wholesale_profile: wp)
        @products = ActiveModel::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
        @serialized_cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
        @cards = customer.cards
        render "manage/primary", locals: {
          isAssumedCustomer: true,
          roaster: @roaster,
          products: @products,
          profile: @customer,
          customer: customer,
          cards: @cards,
          stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
          scripts: ["https://js.stripe.com/v3/"],
          title: 'Create Order for Customer',
          component: 'wholesale/orders/orderForm',
          cart: @serialized_cart
        }
      end
    end

    def show
      order = Order.find(params[:id])
      customer = order.customer_profile
      roaster = current_user.roaster_profile
      @order = ActiveModel::SerializableResource.new(order, serializer: OrderSerializer::SingleOrderSerializer)
      @roaster_profile = ActiveModel::SerializableResource.new(roaster, serializer: RoasterSerializer)
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer, scope: roaster)
      products = ActiveModel::SerializableResource.new(roaster.products, each_serializer: ProductSerializer)
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        profile: @roaster_profile,
        customer: @customer,
        order: @order,
        products: products,
        component: "wholesale/orders/order",
        title: "View Order ##{ order.id }"
      }
    end

    def index
      roaster = current_user.roaster_profile
      orders = roaster.orders
      @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
      render "manage/primary", locals: {
        roaster: roaster,
        customers: roaster.customer_profiles,
        orders: @orders,
        component: "wholesale/orders/orders",
        title: "View Orders"
      }
    end

  end
end
