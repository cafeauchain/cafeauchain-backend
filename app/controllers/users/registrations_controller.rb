class Users::RegistrationsController < Devise::RegistrationsController
  clear_respond_to
  respond_to :json, :html

  protected

  def after_sign_up_path_for(resource)
    new_roaster_profile_path
  end
end
