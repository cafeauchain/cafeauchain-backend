module Api::V1
  class OrdersController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_order, only: [:show, :update]

    def create
      @wholesale_profile = @cart.wholesale_profile
      @order = Order.create(status: :draft, wholesale_profile_id: @wholesale_profile.id, notes: params[:notes] )
      @cart.cart_items.each do |ci|
        pv = ProductVariant.find(ci.product_variant_id)
        @order.order_items.create(
          product_variant_id: pv.id,
          quantity: ci.quantity,
          line_item_cost: (ci.quantity * pv.price_in_cents),
          product_options: ci.production_options
        )
      end
      roast_date = OrderServices::GetRoastDate.process(@order)
      if @order.update(status: :processing, roast_date: roast_date)
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
      render json: @order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
    end

    def index
      if !params[:grouped_order_items].nil?
        orders = current_user.roaster_profile.open_order_items
        items = orders.group_by {|oi| oi[:size]}
        return render json: { data: items }, status: 200, serializer: nil
      end
      if current_user.roaster_profile.present?
        @orders = current_user.roaster_profile.orders#.where(status: status)
        if params[:order_by].nil?
          @orders = @orders.order(created_at: :desc)
        end
        # I think :order_by has to be last because it the only one that changes from AR to an array
        @orders = @orders.filter(params.slice(:range, :status, :invoice_status, :customer, :order_by))
      else
        @orders = Order.where(wholesale_profile: @cart.wholesale_profile)
      end
      paged = pagination(@orders)
      render json: paged[:records], meta: paged[:meta], status: 200
    end

    def update
      if params[:update_items].present?
        @order.order_items.destroy_all
        params[:line_items].each{|li|
          @order.order_items.create(
            product_variant_id: li[:variant_id],
            quantity: li[:quantity],
            line_item_cost: (li[:quantity].to_i * li[:unit_price].to_f * 100),
            product_options: li[:production_options]
          )
        }

        wpid = @order.wholesale_profile_id
        order_shipping_method = @order.order_shipping_method
        rates = ShippingServices::GetRates.get_rate_estimates(@order.id, wpid, true)
        rate = rates.find{|r| r[:carrier] == order_shipping_method[:carrier] and r[:service] == order_shipping_method[:service]}
        order_shipping_method.update(final_rate: rate[:retail_rate])
        invoice = @order.invoice

        subtotal = @order.subtotal.to_f
        final_rate = rate[:retail_rate].to_f
        tax = invoice.tax.to_f
        
        invoice.update(subtotal: subtotal, shipping: final_rate, tax: tax )
      elsif params[:status].present?
        @order.update(status: params[:status])
      elsif params[:roast_date].present?
        @order.update(roast_date: params[:roast_date])
      end

      render json: @order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
    end

    def update_order_items
      @order_item = OrderItem.find(params[:order_item_id])
      @order_item.update(packed: params[:packed])
      render json: @order_item, status: 200
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
