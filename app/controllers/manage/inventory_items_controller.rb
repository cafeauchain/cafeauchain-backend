module Manage
  class InventoryItemsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def index
      render "manage/primary", locals: {
        roaster: @roaster,
        component: "manage/roastProfiles",
        title: "View Roast Profiles"
      }
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

  end
end
