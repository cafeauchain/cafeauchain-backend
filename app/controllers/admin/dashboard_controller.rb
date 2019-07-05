class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @plans = Plan.all
    @users = User.all
    @roasters = RoasterProfile.all
    @roaster = current_user.roaster_profile
    render "manage/primary", locals: {
      roaster: @roaster,
      roasters: @roasters,
      userId: current_user.id,
      title: 'Admin Dashboard',
      component: 'admin'
    }
  end

  def reset_user
    @roaster = current_user.roaster_profile
    @lots = @roaster.lots
    @batches = @lots.map{|lot| lot.batches}.flatten
    @transactions = @lots.map{|lot| lot.transactions}.flatten
    @inventory_items = @lots.map{|lot| lot.inventory_items}.flatten
    @orders = @roaster.orders
    data = @lots.map{|lot|
      @product_inventory_items = lot.inventory_items.map{|ii| ii.product_inventory_items}.flatten
      @products = @product_inventory_items.map{|pii| pii.product}.flatten
      @lot_product_variants = @products.map{|product| product.product_variants}.flatten
      @lot_order_items = OrderItem.where(product_variant_id: @lot_product_variants.map{|lpv| lpv.id})
      @lot_orders = @lot_order_items.uniq{|loi| loi.order.id}
      @lot_invoices = Invoice.where(order_id: @lot_orders.map{|lo| lo.order_id})
      @lot_order_shipping_methods = OrderShippingMethod.where(order_id: @lot_orders.map{|lo| lo.order_id})
      {
        name: lot.name,
        id: lot.id,
        batches: lot.batches,
        transactions: lot.transactions,
        inventory_items: lot.inventory_items,
        product_inventory_items: @product_inventory_items,
        products: @products,
        lot_product_variants: @lot_product_variants,
        lot_order_items: @lot_order_items,
        lot_orders: @lot_orders,
        lot_invoices: @lot_invoices,
        lot_order_shipping_methods: @lot_order_shipping_methods
      }
    }
    render "manage/primary", locals: {
      roaster: @roaster,
      lots: @lots,
      batches: @batches,
      transactions: @transactions,
      inventory_items: @inventory_items,
      data: data,
      orders: @orders,
      userId: current_user.id,
      title: 'Admin::Reset User',
      component: 'admin/resetUser'
    }
  end
  
end