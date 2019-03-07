module Manage
  class OrdersController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_order, only: [:show]

    def show
      @order = ActiveModel::SerializableResource.new(@order, serializer: OrderSerializer::SingleOrderSerializer)
      if current_roaster.present?
        render "wholesale_portal/order"
      else
        render "roaster_admin/order"
      end
    end

    def index
      @orders = Order.all
      @orders = ActiveModel::SerializableResource.new(@orders, each_serializer: OrderSerializer)
      if current_roaster.present?
        render "wholesale_portal/order"
      else
        render "manage/orders"
      end
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
