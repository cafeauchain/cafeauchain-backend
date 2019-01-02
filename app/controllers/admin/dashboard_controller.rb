class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = Plan.all
    @users = User.all
  end
  
end