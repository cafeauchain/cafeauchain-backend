module Shop
  class ProfileController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def index
      customer = current_user.customer_profile
      @customer = ActiveModel::SerializableResource.new(customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster_profile)
      render "manage/primary", locals: {
        roaster: @roaster_profile,
        profile: @customer,
        component: "shop/customer/edit",
        title: "Customer Profile"
      }
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
