# TODO This can probably be deleted
module Manage
  class WholesaleController < ApplicationController
    before_action :authenticate_user!

    def index
      @roaster_profile = current_user.roaster_profile
      @wholesale_profiles = @roaster_profile.wholesale_profiles
      @orders = @roaster_profile.orders
      @orders = ActiveModel::SerializableResource.new(@roaster_profile.orders, each_serializer: OrderSerializer)
      render "roaster_profiles/wholesale"
    end

  end
end
