module Api::V1
  class OrdersController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_order, only: [:show, :update]

    def create
      @wholesale_profile = @cart.wholesale_profile
      @order = Order.create(status: :draft, wholesale_profile_id: @wholesale_profile.id)
      @cart.cart_items.each do |ci|
        pv = ProductVariant.find(ci.product_variant_id)
        @order.order_items.create(
          product_variant_id: pv.id,
          quantity: ci.quantity,
          line_item_cost: (ci.quantity * pv.price_in_cents),
          product_options: ci.production_options,
          notes: ci.notes
        )
      end
      if @order.update(status: :processing)
        @cart.cart_items.destroy_all
        OrderServices::ProcessOrder.process(@order.id, params)
      end
      if params[:isAssumedCustomer].present?
        render json: {redirect_url: manage_order_path(@order), redirect: true}, status: 200  
      else
        render json: {redirect_url: shop_order_path(@order), redirect: true}, status: 200
      end
    end

    def show
    end

    def index
      if params[:status].present?
        case params[:status]
        when "open"
          status = [:processing, :awaiting_payment, :paid_in_full]
        # TODO Right now, I'm only getting open orders
        # Revisit later
        else
          status = [:processing, :awaiting_payment, :paid_in_full]
        end
      end
      if current_user.roaster_profile.present?
        @orders = current_user.roaster_profile.orders
      else
        @orders = Order.where(status: status, wholesale_profile: @cart.wholesale_profile)
      end
      render json: @orders, status: 200
    end

    def update
      if params[:update_items].present?
        @order.order_items.destroy_all
        params[:line_items].each{|li|
          @order.order_items.create(
            product_variant_id: li[:variant_id],
            quantity: li[:quantity],
            line_item_cost: (li[:quantity].to_i * li[:unit_price].to_f * 100),
            product_options: li[:production_options],
            notes: li[:notes]
          )
        }

        wpid = @order.wholesale_profile_id
        order_shipping_method = @order.order_shipping_method
        rates = ShippingServices::GetRates.get_rate_estimates(@order.id, wpid, true)
        rate = rates.find{|rate| rate[:carrier] == order_shipping_method[:carrier] and rate[:service] == order_shipping_method[:service]}
        order_shipping_method.update(final_rate: rate[:retail_rate])
        invoice = @order.invoice

        subtotal = @order.subtotal.to_f
        final_rate = rate[:retail_rate].to_f
        tax = invoice.tax.to_f
        total = subtotal + final_rate + tax

        invoice.update(subtotal: subtotal, total: total )
      elsif params[:status].present?
        @order.update(status: params[:status])
        if @order.status == "fulfilled"
          StripeServices::CaptureCharge.capture(@order)
          InventoryServices::UpdateProductInventoryFromOrder.fulfill(@order)
        end
      end

      render json: @order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
