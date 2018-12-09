class DashboardController < ApplicationController
  def index
    @lots = current_user.roaster_profile.lots
  end

  def accept_delivery  
  end
end
