class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = Plan.all
    @users = User.all
    @roasters = RoasterProfile.all
    render "manage/primary", locals: {
      roasters: @roasters,
      userId: current_user.id,
      title: 'Admin Dashboard',
      component: 'admin'
    }
  end
  
end