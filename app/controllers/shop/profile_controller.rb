module Shop
  class ProfileController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def index
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        component: "shop/customer/edit",
        title: "Customer Profile"
      }
    end

    def payment
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
        cards: customer.cards,
        scripts: ["https://js.stripe.com/v3/"],
        component: "shop/customer/paymentWrapper",
        title: "Payment | Customer Profile"
      }
    end

    def addresses
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        component: "shop/customer/addressesWrapper",
        title: "Addresses | Customer Profile"
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
