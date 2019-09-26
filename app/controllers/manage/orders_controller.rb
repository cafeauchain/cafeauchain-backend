module Manage
  class OrdersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_order, only: [:show]

    def new
      if params[:customer_profile_id].blank?
        render "manage/primary", locals: {
          component: "empty",
          title: "No Customer Selected"
        }
      else
        wp = WholesaleProfile.where(roaster_profile: @roaster, customer_profile_id: params[:customer_profile_id]).first
        customer = wp.customer_profile
        @customer = ActiveModelSerializers::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
        @cart = Cart.find_by(wholesale_profile: wp)
        @products = ActiveModelSerializers::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
        @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
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
      customer = @order.customer_profile
      title = "View Order ##{ @order.id }"
      @order = ActiveModelSerializers::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
      @roaster_profile = ActiveModelSerializers::SerializableResource.new(@roaster, serializer: RoasterSerializer)
      @customer = ActiveModelSerializers::SerializableResource.new(customer, serializer: CustomerSerializer, scope: @roaster)
      products = ActiveModelSerializers::SerializableResource.new(@roaster.products, each_serializer: ProductSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        profile: @roaster_profile,
        customer: @customer,
        order: @order,
        products: products,
        component: "wholesale/orders/order",
        title: title
      }
    end

    def index
      render "manage/primary", locals: {
        roaster: @roaster,
        customers: @roaster.customer_profiles.approved,
        component: "wholesale/orders/orders",
        title: "View Orders"
      }
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

    def set_order
      if Order.exists?(id: params[:id])
        @order = Order.find(params[:id])
      else
        return redirect_to manage_orders_path
      end
      wp = @order.wholesale_profile
      same_roaster = wp.roaster_profile_id == current_user.roaster_profile_id
      if !same_roaster
        return redirect_to manage_orders_path
      end
    end

  end
end
