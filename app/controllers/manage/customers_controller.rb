module Manage
  class CustomersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_customer, only: [:show]

    def show
      @customer = ActiveModel::SerializableResource.new(@customer, serializer: CustomerSerializer)
      render "manage/customer"
    end

    def index
      @customers = CustomerProfile.all
      @customers = ActiveModel::SerializableResource.new(@customers, each_serializer: CustomerSerializer, scope: current_user)
      render "manage/customers"
    end

    private

    def set_customer
      @customer = CustomerProfile.find(params[:id])
    end

  end
end
