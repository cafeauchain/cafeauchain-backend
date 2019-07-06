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
      if !roaster_id.nil?
        roaster = RoasterProfile.find(roaster_id)
        if roaster.onboard_status == "onboard_completed"
          @redirect_to = manage_dashboard_path
        else
          @redirect_to = send("onboarding_#{roaster.onboard_status}_path")
        end
      else
        @redirect_to = admin_dashboard_path
      end
      render json: { redirect: true, redirect_url: @redirect_to }, status: 200
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

    def delete_lot
      lot = Lot.find(params[:id])
      @products = []
      @product_variants = []
      @product_inventory_items = []
      
      lot.inventory_items.each{|ii|
        @product_inventory_items << ii.product_inventory_items
        ii.product_inventory_items.each{|pii| @products << pii.product}
      }
      @products = @products.uniq{|prod| prod.id}
      @products.each{|product| @product_variants << product.product_variants }
      @product_variants = @product_variants.flatten
      @product_inventory_items = @product_inventory_items.flatten

      @pv_id = @product_variants.map{|pv| pv.id}
      @pii_id = @product_inventory_items.map{|pii| pii.id}
      @product_id = @products.map{|product| product.id}

      lot.transactions.destroy_all
      ProductVariant.destroy(@pv_id)
      ProductInventoryItem.destroy(@pii_id)
      Product.destroy(@product_id)
      CartItem.where(product_variant_id: @pv_id).destroy_all
      lot.inventory_items.destroy_all
      lot.destroy

      render json: {
        transactions: lot.transactions,
        pv: @product_variants,
        pii: @product_inventory_items,
        products: @products,
        ii: lot.inventory_items
      }, status: 200
    end

  end
end
