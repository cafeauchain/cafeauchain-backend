class Users::SessionsController < Devise::SessionsController

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    puts "Logged in!"
    puts current_user
    if resource.roaster_profile.nil? && !ValidSubdomain.matches?(request)
      render json: {"redirect":true,"redirect_url": onboarding_profile_path}, status: 200
    elsif !resource.roaster_profile.nil? && !ValidSubdomain.matches?(request)
      render json: {"redirect":true,"redirect_url": manage_dashboard_path}, status: 200
    elsif ValidSubdomain.matches?(request)
      customer = current_user.customer_profile
      wholesale = customer.wholesale_profiles.find_by(roaster_profile: current_roaster)
      isProfileComplete = wholesale.onboard_status == 'approved'
      status = wholesale.onboard_status
      redirect_url = isProfileComplete ? root_path : send("shop_onboard_#{status}_path")
      render json: { "redirect":true, "redirect_url": redirect_url }, status: 200
    end
  end

  def failure
    warden.custom_failure!
    render json: { success: false, error: { message: t("devise.failure.#{request.env['warden'].message}") }}, status: 401
  end
end
