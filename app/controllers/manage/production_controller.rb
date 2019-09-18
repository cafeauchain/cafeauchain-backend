module Manage
  class ProductionController < ApplicationController
    before_action :authenticate_user!

    def index
      items = current_user.roaster_profile.open_order_items
      variations = current_user.roaster_profile.open_order_items_grid

      orders = items.group_by{|o| o[:product]}.each_with_object({}) {|(k, v), h| h[k] = v.group_by{|i| i[:size]} }
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        orders: orders,
        variations: variations,
        component: "manage/production",
        title: "Production Queue"
      }
    end

  end
end
