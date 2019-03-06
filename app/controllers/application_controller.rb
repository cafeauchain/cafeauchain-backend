class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_roaster
  before_action :set_raven_context
  before_action :set_cart
  after_action :set_csrf_cookie
  layout :layout_by_resource

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

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

  def current_roaster
    if SubdomainRoutes
      @current_roaster = RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end

  def set_cart
    if user_signed_in?
      @cart = current_user.cart(current_roaster)
      @cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    else
      @cart = nil
    end
  end
end
