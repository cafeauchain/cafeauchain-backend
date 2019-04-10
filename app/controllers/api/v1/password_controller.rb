module Api::V1
  class PasswordController < ApplicationController

    def password_reset
      customer = CustomerProfile.find(params[:customer_profile_id])
      owner = customer.owner
      roaster = RoasterProfile.find(params[:roaster_profile_id])
      owner[:roaster_profile_id] = roaster.id
      owner.send_reset_password_instructions
      render json: owner, status: 200
    end

  end
end
