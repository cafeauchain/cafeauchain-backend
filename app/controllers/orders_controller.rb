class OrdersController < ApplicationController
  before_action :set_cart
  before_action :authenticate_user!
  before_action :set_order, only: [:show]
  before_action :serialize_cart

  def show
    @order = ActiveModel::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
    render "manage/primary", locals: {
      roaster: current_roaster,
      order: @order,
      cart: @serialized_cart,
      title: 'Order',
      component: 'shop/order'
    }
  end

  def index
    orders = Order.all
    @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
    render "manage/primary", locals: {
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
