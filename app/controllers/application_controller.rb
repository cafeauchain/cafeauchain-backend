class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user_from_cookie
  before_action :current_roaster
  before_action :set_raven_context
  before_action :set_cart
  before_action :onboard_validation
  after_action :set_csrf_cookie

  helper_method :current_roaster
  helper_method :set_cart

  protected

  def pagination(records)
    page = params[:page] || 1
    limit = params[:limit] || 10
    record_count = records.length
    total_pages = (record_count / limit.to_f).ceil
    meta = {
      pagination: {
        pagenumber: page,
        pagesize: limit.to_i,
        totalpages: total_pages,
        totalcount: record_count
      }
    }
    records = Kaminari.paginate_array(records).page(page).per(limit)
    return { records: records, meta: meta }
  end

  def authenticate_user_from_cookie
    if !cookies[:cac_token_auth].nil?
      request.headers["Authorization"] = "Bearer " + cookies[:cac_token_auth].to_s
      if !user_signed_in?
        cookies.delete :cac_token_auth
      end
    end
  end

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
    if user_signed_in?
      if current_user.admin? and current_user.roaster_profile.nil?
        @cart = nil
      elsif current_user.roaster_profile.nil?
        @cart = current_user.cart(current_roaster)
      else
        if params[:customer_profile_id].present?
          wp = WholesaleProfile.find_by(roaster_profile: current_user.roaster_profile, customer_profile_id: params[:customer_profile_id])
          @cart = wp.cart
        else
          @cart = nil
        end
      end
    end
  end

  # TODO Revisit the validation. Especially for when an admin assumes a roaster
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
              else
                if params["controller"] == "shop/onboard"
                  redirect_to root_path
                end
              end
            end
          end
        end
      else
        # Roaster side
        if current_user.admin?
          # This needs more work/thought
        elsif current_user.roaster_profile.present?
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
