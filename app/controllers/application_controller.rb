class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_roaster
  before_action :set_raven_context
  before_action :set_cart, if: :current_roaster
  before_action :onboard_validation
  after_action :set_csrf_cookie

  helper_method :current_roaster
  helper_method :set_cart

  protected

  def set_csrf_cookie
    cookies["X-CSRF-Token"] = form_authenticity_token
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  private

  def set_raven_context
    Raven.user_context(id: session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def current_roaster
    if ValidSubdomain.matches?(request)
      @current_roaster = RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end

  def set_cart
    if user_signed_in? && current_user.roaster_profile.nil?
      @cart = current_user.cart(current_roaster)
    else
      @cart = nil
    end
  end

  def onboard_validation
    if user_signed_in?
      if ValidSubdomain.matches?(request)
        # Customer Side
        customer = current_user.customer_profile
        if customer.present?
          wholesale = customer.wholesale_profiles.find_by(roaster_profile: current_roaster)
          if wholesale.present?
            if !(self.class.parent == Api::V1 || self.class.parent == HighVoltage || self.class.parent == Devise || self.class.parent == Users)
              if wholesale.onboard_status != "approved"
               if params["controller"] != "shop/onboard"
                redirect_to send("shop_onboard_#{wholesale.onboard_status}_path") 
               end
              end
            end
          end
        end
      else
        # Roaster side
        if current_user.roaster_profile.present?
          profile = current_user.roaster_profile
          if profile.onboard_status != "onboard_completed"
            if !(self.class.parent == Api::V1 || self.class.parent == HighVoltage || self.class.parent == Devise || self.class.parent == Users)
              if params["controller"] != "onboarding/onboarding" 
                redirect_to send("onboarding_#{profile.onboard_status}_path")
              end
            end
          end
        end
      end
    end
  end
  
end
