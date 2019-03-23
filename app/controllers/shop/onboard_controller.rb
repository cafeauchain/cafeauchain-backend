module Shop
  class OnboardController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def profile
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "manage/primary", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        header_info: {url: @roaster_profile.logo_image_url, name: @roaster_profile.name},
        cart: @cart,
        component: "shop/onboard/profile",
        title: "Customer Onboarding | Profile"
      }
    end

    def addresses
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "manage/primary", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        header_info: {url: @roaster_profile.logo_image_url, name: @roaster_profile.name},
        cart: @cart,
        component: "shop/onboard/addresses",
        title: "Customer Onboarding | Addresses"
      }
    end

    def payment
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "manage/primary", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        header_info: {url: @roaster_profile.logo_image_url, name: @roaster_profile.name},
        cart: @cart,
        stripeApiKey: Rails.application.credentials.stripe_api_key,
        scripts: ["https://js.stripe.com/v3/"],
        component: "shop/onboard/payment",
        title: "Customer Onboarding | Payment"
      }
    end

    def shipping
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "manage/primary", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        header_info: {url: @roaster_profile.logo_image_url, name: @roaster_profile.name},
        cart: @cart,
        component: "shop/onboard/shipping",
        title: "Customer Onboarding | Shipping Preferences"
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
