module Manage
  class CustomersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_customer, only: [:show]

    def show
      customer = ActiveModel::SerializableResource.new(@customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
      render "manage/primary", locals: {
        roaster: @roaster,
        customer: customer,
        component: "wholesale/customer",
        title: @customer.company_name
      }
    end

    def index
      @customers = @roaster.customer_profiles
      @customers = ActiveModel::SerializableResource.new(@customers, each_serializer: CustomerSerializer, scope: @roaster)
      render "manage/primary", locals: {
        roaster: @roaster,
        customers: @customers,
        component: "wholesale/customers",
        title: "View Customers"
      }
    end

    private
    def set_roaster
      @roaster = current_user.roaster_profile
    end

    def set_customer
      begin
        @customer = @roaster.customer_profiles.find(params[:id])
      rescue
        redirect_to manage_customers_path
      end
    end

  end
end
