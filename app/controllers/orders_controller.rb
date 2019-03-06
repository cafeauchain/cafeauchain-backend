class OrdersController < ApplicationController
  before_action :set_cart
  before_action :authenticate_user!
  before_action :set_order, only: [:show]

  def show
    @order = ActiveModel::SerializableResource.new(@order, each_serializer: OrderSerializer)
  end

  def index
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

end
