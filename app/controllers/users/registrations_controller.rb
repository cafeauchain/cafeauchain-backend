class Users::RegistrationsController < Devise::RegistrationsController
  
  def create 
    build_resource(registration_params)

    if resource.save
      sign_in(resource, scope: resource_name)
      if resource.roaster_profile.nil? && !SubdomainRoutes
        render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
      elsif !resource.roaster_profile.nil? && !SubdomainRoutes
        render json: {"redirect":true,"redirect_url": dashboard_roaster_profile_path(resource.roaster_profile)}, status: 200
      else
        render json: {"redirect":true,"redirect_url": shop_roaster_profile_path(current_roaster)}, status: 200
      end
    else
      render json: { success: false, error: resource.errors }, status: 422 
    end
  end 

  protected
  
  def after_sign_up_path_for(resource)
    if resource.roaster_profile.nil? && SubdomainRoutes
      new_roaster_profile_path
    else
      root_path
    end
  end

  private

  def registration_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
