# TODO This can probably be deleted
module Manage
  class InventoryController < ApplicationController
    before_action :authenticate_user!

    def index
      @roaster_profile = current_user.roaster_profile
      render "roaster_profiles/manage_inventory"
    end

  end
end
