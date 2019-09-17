module Manage
  class ProductionController < ApplicationController
    before_action :authenticate_user!

    def index
      orders = current_user.roaster_profile.open_order_items
      items = orders.group_by{|o| o[:product]}.each_with_object({}) {|(k, v), h| h[k] = v.group_by{|i| i[:size]} }
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        orders: items,
        component: "manage/production",
        title: "Production Queue"
      }
    end

  end
end
