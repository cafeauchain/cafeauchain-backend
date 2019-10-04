module Api::V1
  class OrdersController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_order, only: [:show, :update, :destroy]

    def create
      @wholesale_profile = @cart.wholesale_profile
      @order = Order.create(status: :draft, wholesale_profile_id: @wholesale_profile.id, notes: params[:notes] )
      build_line_items(@cart.cart_items)

      roast_date = OrderServices::GetRoastDate.process(@order.roaster_profile, @order.create_at)[:roast_date]
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
        build_line_items(params[:line_items])

        wpid = @order.wholesale_profile_id
        order_shipping_method = @order.order_shipping_method
        rates = ShippingServices::GetRates.get_rate_estimates(@order.id, wpid, true)
        rate = rates.find{|r| r[:carrier] == order_shipping_method[:carrier] and r[:service] == order_shipping_method[:service]}
        order_shipping_method.update(final_rate: rate[:retail_rate])
        invoice = @order.invoice

        subtotal = @order.subtotal.to_f
        final_rate = rate[:retail_rate].to_f
        taxable = subtotal + final_rate - @order.invoice_discount.to_f
        tax = taxable * @order.invoice.tax_rate
        
        invoice.update(subtotal: subtotal, shipping: final_rate, tax: tax )
      elsif params[:status].present?
        @order.update(status: params[:status])
      elsif params[:roast_date].present?
        @order.update(roast_date: params[:roast_date])
      end

      render json: @order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
    end

    def destroy
      if @order.destroy!
        render json: { redirect_url: manage_orders_path, redirect: true }, status: 200
      else
        render json: { data: @order.errors.full_messages, messages: @order.errors.full_messages }, status: 422
      end
    end

    def update_order_items
      @order_item = OrderItem.find(params[:order_item_id])
      @order_item.update(packed: params[:packed])
      render json: @order_item, status: 200
    end

    private

    def build_line_items(items)
      items.each{|item|
          variant_id = item[:variant_id] || item[:product_variant_id]
          pv = ProductVariant.find(variant_id)
          price = pv.price_in_cents.to_i
          discount = @order.wholesale_profile.cust_discount
          discounted_price = price
          if !discount.nil? && discount > 0
            discounted_price = price * (100 - discount)/100.0
          end
          @order.order_items.create(
            product_variant_id: variant_id,
            quantity: item[:quantity].to_i,
            line_item_cost: (item[:quantity].to_i * discounted_price.round(0)),
            product_options: item[:production_options]
          )
      }
    end

    def set_order
      if Order.exists?(id: params[:id])
        @order = Order.find(params[:id])
      else
        return redirect_to manage_orders_path
      end
      wp = @order.wholesale_profile
      user_is_customer = current_user.customer_profile
      user_is_roaster = current_user.roaster_profile

      # Customer side
      if !user_is_customer.nil?
        same_customer = wp.customer_profile_id == user_is_customer.id
        if !same_customer
          render json: { data: "Unauthorized" }, status: 401 and return
        end
      # Roaster side
      elsif !user_is_roaster.nil?
        same_roaster = wp.roaster_profile_id == user_is_roaster.id
        if !same_roaster
          render json: { data: "Unauthorized" }, status: 401 and return
        end
      end
    end

  end
end
