class Users::SessionsController < Devise::SessionsController

  def create 
    resource = warden.authenticate!(:scope => resource_name) 
    if resource.roaster_profile.nil?
      render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
    else
      render json: {"redirect":true,"redirect_url": root_path}, status: 200
    end  
  end 
  
  protected
  
  def after_sign_in_path_for(resource)
    if resource.roaster_profile.nil?
      new_roaster_profile_path
    else
      root_path
    end
  end  
end