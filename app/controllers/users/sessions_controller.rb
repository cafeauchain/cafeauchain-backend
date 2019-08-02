class Users::SessionsController < Devise::SessionsController

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    puts "Logged in!"
    puts current_user.inspect
    if resource.admin?
      if resource.roaster_profile.nil?
        return render json: {"redirect": true, redirect_url: admin_dashboard_path }, status: 200
      else
        return render json: {"redirect":true,"redirect_url": manage_dashboard_path}, status: 200
      end
    end

    # User is a customer
    if !resource.customer_profile.nil?
      customer = current_user.customer_profile
      if ValidSubdomain.matches?(request)
        # subdomain is valid
        wholesale = customer.wholesale_profiles.find_by(roaster_profile: current_roaster)
        isProfileComplete = wholesale.onboard_status == 'approved'
        status = wholesale.onboard_status
        redirect_url = isProfileComplete ? root_path : send("shop_onboard_#{status}_path")
      else
        # subdomain is not valid or non-existent
        wholesale = customer.wholesale_profiles.first
        roaster = wholesale.roaster_profile
        isProfileComplete = wholesale.onboard_status == 'approved'
        status = wholesale.onboard_status
        redirect_url = shop_handletoken_url(params: {token: resource.token}, subdomain: roaster.subdomain)
      end
    else
    # User is a roaster
      if resource.roaster_profile.nil?
        # User has not completed profile
        redirect_url = onboarding_profile_path
      else
        # User has completed profile
        redirect_url = manage_dashboard_path
      end
    end
    render json: {"redirect":false, redirect_url: redirect_url}, status: 200
  end

  def failure
    warden.custom_failure!
    render json: { success: false, error: { message: t("devise.failure.#{request.env['warden'].message}") }}, status: 401
  end
end
