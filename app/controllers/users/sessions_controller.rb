class Users::SessionsController < Devise::SessionsController

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    if resource.roaster_profile.nil?
      render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
    else
      render json: {"redirect":true,"redirect_url": dashboard_roaster_profile_path(resource.roaster_profile)}, status: 200
    end
  end

  def failure
    warden.custom_failure!

    render json: { success: false, error: { message: t("devise.failure.#{request.env['warden'].message}") }}, status: 401
  end
end
