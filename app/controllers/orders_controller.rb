class OrdersController < ApplicationController
  before_action :set_cart
  before_action :authenticate_user!
  before_action :set_order, only: [:show]

  def show
    @order = ActiveModel::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
  end

  def index
    @orders = Order.all
    @orders = ActiveModel::SerializableResource.new(@orders, each_serializer: OrderSerializer)
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

end
