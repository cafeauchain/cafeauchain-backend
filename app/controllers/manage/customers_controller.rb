module Manage
  class CustomersController < ApplicationController

    def show
      customer = CustomerProfile.find(params[:id])
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: current_user.roaster_profile)
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        customer: @customer,
        component: "wholesale/customer",
        title: customer.company_name
      }
    end

    def index
      customers = current_user.roaster_profile.customer_profiles
      @customers = ActiveModel::SerializableResource.new(customers, each_serializer: CustomerSerializer, scope: current_user.roaster_profile)
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        customers: @customers,
        component: "wholesale/customers",
        title: "View Customers"
      }
    end

  end
end
