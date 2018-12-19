class Admin::DashboardController < ApplicationController

  def index
    @plans = Plan.all
  end
  
end