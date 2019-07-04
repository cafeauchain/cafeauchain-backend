class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = Plan.all
    @users = User.all
    @roasters = RoasterProfile.all
    render "manage/primary", locals: {
      roasters: @roasters,
      userId: current_user.id,
      title: 'Admin Dashboard',
      component: 'admin'
    }
  end

  def reset_user
    @roaster = current_user.roaster_profile
    @lots = @roaster.lots
    @batches = @lots.map{|lot| lot.batches}
    @transactions = []
    @lots.each{|lot| @transactions << lot.transactions}
    @inventory_items = []
    @lots.each{|lot| lot.inventory_items.each{|ii| @inventory_items << ii}}
    @orders = @roaster.orders
    render "manage/primary", locals: {
      roasters: @roasters,
      lots: @lots,
      batches: @batches,
      transactions: @transactions,
      inventory_items: @inventory_items,
      orders: @orders,
      userId: current_user.id,
      title: 'Admin::Reset User',
      component: 'admin/resetUser'
    }
  end
  
end