module Manage
  class OrdersController < ApplicationController
    before_action :authenticate_user!

    def show
      order = Order.find(params[:id])
      customer = order.customer_profile
      roaster = current_user.roaster_profile
      @order = ActiveModel::SerializableResource.new(order, serializer: OrderSerializer::SingleOrderSerializer)
      @roaster_profile = ActiveModel::SerializableResource.new(roaster, serializer: RoasterSerializer)
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer, scope: roaster)
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        profile: @roaster_profile,
        customer: @customer,
        order: @order,
        component: "wholesale/order",
        title: "View Order ##{ order.id }"
      }
    end

    def index
      orders = Order.all
      @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        orders: @orders,
        component: "wholesale/orders",
        title: "View Orders"
      }
    end

  end
end
