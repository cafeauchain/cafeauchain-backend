module Shop
  class TokenController < ApplicationController
    before_action :set_cac_token_auth, only: [:handletoken]
    before_action :authenticate_user_from_cookie
    before_action :authenticate_user!
    before_action :set_roaster
    before_action :set_cart

    def handletoken
      @roaster = @roaster
      @serialized_cart = ActiveModelSerializers::SerializableResource.new(@cart, each_serializer: CartSerializer)
      redirect_to root_path
    end

    private

    def set_roaster
      @roaster = current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    end

    def set_cac_token_auth
      if !params[:token].nil?
        cookies[:cac_token_auth] = {
          :value => params[:token]
        }
      end
    end
  end
end
