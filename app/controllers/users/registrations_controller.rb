class Users::RegistrationsController < Devise::RegistrationsController

  def create
    build_resource(registration_params)

    if resource.save
      sign_in(resource, scope: resource_name)
      if resource.roaster_profile.nil? && !ValidSubdomain.matches?(request)
        render json: {"redirect":true,"redirect_url": onboarding_profile_path}, status: 200
      else ValidSubdomain.matches?(request)
        cp = CustomerProfile.create!(owner_id: resource.id, email: resource.email)
        cp.users << resource
        wp = cp.wholesale_profiles.create!(roaster_profile: current_roaster)
        wp.create_cart
        wp.update!(onboard_status: 'profile')
        render json: {"redirect":true,"redirect_url": shop_onboard_profile_path}, status: 200
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
