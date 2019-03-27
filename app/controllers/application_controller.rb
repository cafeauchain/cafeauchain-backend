class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_roaster
  before_action :set_raven_context
  before_action :set_cart, if: :current_roaster
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
end
