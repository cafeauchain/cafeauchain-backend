class Users::RegistrationsController < Devise::RegistrationsController
  
  def create 
    build_resource(registration_params)

    if resource.save
      sign_in(resource, scope: resource_name)
      if resource.roaster_profile.nil?
        render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
      else
        render json: {"redirect":true,"redirect_url": root_path}, status: 200
      end  
    end
  end 

  protected
  
  def after_sign_up_path_for(resource)
    if resource.roaster_profile.nil?
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
