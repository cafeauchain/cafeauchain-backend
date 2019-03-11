# TODO This can probably be deleted
module Manage
  class DashboardController < ApplicationController

    def index
      @roaster_profile = current_user.roaster_profile
      render "roaster_profiles/dashboard"
    end

  end
end
