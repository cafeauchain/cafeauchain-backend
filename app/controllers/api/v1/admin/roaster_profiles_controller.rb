module Api::V1::Admin
  class RoasterProfilesController < ApplicationController

    def index
      page = params[:page] || 1
      perPage = params[:per_page] || 15
      @producers = RoasterProfile.page(page).per(perPage)
      total_pages = (RoasterProfile.all.count / perPage.to_f).ceil

      render json: @producers,
        meta: {
          pagination: {
            pagenumber: page.to_f,
            pagesize: perPage.to_f,
            totalpages: total_pages,
            totalobjects: RoasterProfile.all.count
          }
        }
    end

    def update
      id = params[:id]
      roaster_id = params[:roaster_profile_id]
      User.find(params[:id]).update(roaster_profile_id: roaster_id)
      render json: { redirect: true, redirect_url: manage_dashboard_path }, status: 200
    end

    def reset_profile
      @roaster = current_user.roaster_profile
      @roaster.lots.each{|lot|
        lot.batches.destroy_all
        lot.transactions.where(trans_type: :roasted).destroy_all
        lot.inventory_items.each{|ii| ii.update(quantity: 0)}
      }
      @roaster.orders.each{|order|
        order.order_items.destroy_all
        order.invoice.destroy
        order.order_shipping_method.destroy
        order.destroy
      }
      render json: @roaster, status: 200
    end

    def update_inventory_item_quantities
      details = params[:details]
      again = []
      details.each{|key, val| InventoryItem.find(key).update(quantity: val)}
      render json: again, status: 200
    end

  end
end
