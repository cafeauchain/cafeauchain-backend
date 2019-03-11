class Users::RegistrationsController < Devise::RegistrationsController

  def create
    build_resource(registration_params)

    if resource.save
      sign_in(resource, scope: resource_name)
      if resource.roaster_profile.nil? && SubdomainRoutes.matches?(request)
        render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
      else !SubdomainRoutes.matches?(request)
        cp = CustomerProfile.create(owner_id: resource.id)
        cp.users << resource
        wp = cp.wholesale_profiles.create(roaster_profile: current_roaster)
        wp.create_cart
        render json: {"redirect":true,"redirect_url": shop_roaster_profile_path(current_roaster)}, status: 200
      end
    else
      render json: { success: false, error: resource.errors }, status: 422
    end
  end

  private

  def registration_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
