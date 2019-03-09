module Shop
  class ShopController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def index
      @roaster_profile = @current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
      @products = ActiveModel::SerializableResource.new(@roaster_profile.products, each_serializer: ProductSerializer)
      render 'roaster_profiles/shop'
    end

    private

    def set_roaster
      @roaster_profile = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end
end
