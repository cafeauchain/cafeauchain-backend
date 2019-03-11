class OrdersController < ApplicationController
  before_action :set_cart
  before_action :authenticate_user!
  before_action :set_order, only: [:show]

  def show
    @order = ActiveModel::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
    render "manage/primary", locals: {
      roaster: current_roaster,
      order: @order,
      title: 'Order',
      component: 'shop/order',
      cart: @ser_cart
    }
  end

  def index
    orders = Order.all
    @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
    render "manage/primary", locals: {
      roaster: current_roaster,
      orders: @orders,
      title: 'Orders',
      component: 'shop/orders',
      cart: @ser_cart
    }
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

end
