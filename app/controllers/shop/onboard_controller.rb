module Shop
  class OnboardController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_customer

    def profile
      render "customer/base", locals: {
        roaster: @roaster,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/profile",
        title: "Customer Onboarding | Profile"
      }
    end

    def addresses
      render "customer/base", locals: {
        roaster: @roaster,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/addresses",
        title: "Customer Onboarding | Addresses"
      }
    end

    def payment
      render "customer/base", locals: {
        roaster: @roaster,
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
      methods = @roaster_profile.shipping_methods
      render "customer/base", locals: {
        roaster: @roaster,
        profile: @customer,
        cart: @cart,
        shipping_methods: methods,
        component: "shop/onboard/shipping",
        title: "Customer Onboarding | Shipping Preferences"
      }
    end
    
    def onboard_completed
      render "customer/base", locals: {
        roaster: @roaster,
        profile: @customer,
        cart: @cart,
        component: "shop/onboard/complete",
        title: "Customer Onboarding | Registration Complete"
      }
    end

    private

    def set_roaster
      @roaster = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end

    def set_customer
      customer = current_user.customer_profile
      @customer = ActiveModelSerializers::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
    end
  end
end
