module Shop
  class OnboardController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def profile
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/profile",
        title: "Customer Onboarding | Profile"
      }
    end

    def addresses
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/addresses",
        title: "Customer Onboarding | Addresses"
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
        component: "shop/onboard/payment",
        title: "Customer Onboarding | Payment"
      }
    end

    # Currently disabled
    def shipping
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      methods = @roaster_profile.shipping_methods
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        shipping_methods: methods,
        component: "shop/onboard/shipping",
        title: "Customer Onboarding | Shipping Preferences"
      }
    end
    
    def onboard_completed
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "customer/base", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/complete",
        title: "Customer Onboarding | Registration Complete"
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
