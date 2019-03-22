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

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
