class Users::SessionsController < Devise::SessionsController

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    puts "Logged in!"
    puts current_user
    if resource.roaster_profile.nil? && SubdomainRoutes.matches?(request)
      render json: {"redirect":true,"redirect_url": new_roaster_profile_path}, status: 200
    elsif !resource.roaster_profile.nil? && SubdomainRoutes.matches?(request)
      render json: {"redirect":true,"redirect_url": manage_dashboard_path}, status: 200
    elsif !SubdomainRoutes.matches?(request)
      render json: {"redirect":true,"redirect_url": shop_roaster_profile_path(current_roaster)}, status: 200
    end
  end

  def failure
    warden.custom_failure!
    render json: { success: false, error: { message: t("devise.failure.#{request.env['warden'].message}") }}, status: 401
  end
end
