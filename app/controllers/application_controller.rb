class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_roaster
  before_action :set_raven_context
  after_action :set_csrf_cookie
  layout :layout_by_resource

  def current_roaster
    if SubdomainRoutes
      @current_roaster ||= RoasterProfile.find_by(subdomain: request.subdomain)
      set_cart
    end
  end

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

  def set_current_roaster
    if !SubdomainRoutes
      @current_roaster = RoasterProfile.find_by(subdomain: request.subdomain)
    end
  end

  def set_cart
    user = current_user;
    if user.customer_profile_id.present?
      cust_id = user.customer_profile_id
      whlsl_id = WholesaleProfile.find_by(customer_profile_id: cust_id).id
      @cart = Cart.find_by(wholesale_profile_id: whlsl_id)
      @cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
    end
  end

end
