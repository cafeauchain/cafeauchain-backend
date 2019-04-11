module Manage
  class ProductionController < ApplicationController
    before_action :authenticate_user!

    def index
      orders = current_user.roaster_profile.open_order_items
      items = orders.group_by {|oi| oi[:size]}
      render "manage/primary", locals: {
        roaster: current_user.roaster_profile,
        orders: items,
        component: "manage/production",
        title: "Production Queue"
      }
    end

  end
end
