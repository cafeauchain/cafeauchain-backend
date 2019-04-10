class Users::PasswordsController < Devise::PasswordsController

  def update
    @user = User.with_reset_password_token(params[:token])
    if @user.reset_password(params[:password], params[:password_confirmation])
        sign_in(@user, scope: "User")
        render json: {"redirect": true, "redirect_url": shop_onboard_profile_path, data: @user}, status: 200
    else
        render json: {"redirect": false, data: @user}, status: 200
    end
  end
  
end