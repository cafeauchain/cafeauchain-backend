module Manage
  class InventoryController < ApplicationController

    def index
      @roaster_profile = current_user.roaster_profile
      render "roaster_profiles/manage_inventory"
    end

  end
end
