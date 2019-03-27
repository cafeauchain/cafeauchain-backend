module OrderServices
  class ProcessOrder
    def self.process(order_id, params)
      payment_source = params[:payment_source]

      @order = Order.find(order_id)

      order_shipping_method = OrderShippingMethod.create(
        order_id: @order.id,
        final_rate: params[:shipping][:retail_rate],
        service: params[:shipping][:service],
        carrier: params[:shipping][:carrier]
      )
      @invoice = Invoice.create(
        subtotal: @order.subtotal, 
        total: @order.subtotal.to_f + params[:shipping][:retail_rate].to_f + params[:tax].to_f,
        tax: params[:tax], 
        payment_type: params[:payment_type], 
        order_id: @order.id
      )
      @order.update(status: :awaiting_payment)
      NotificationServices::SendRoasterOrderEmail.send(@order.wholesale_profile.roaster_profile, @order.wholesale_profile.customer_profile, @order)
      if params[:payment_type] == "card_on_file"
        @charge = StripeServices::CreateInvoiceCharge.charge(@invoice, payment_source)
      else
        @invoice.update(status: :awaiting_payment)
      end
      InventoryServices::UpdateProductInventoryFromOrder.update(@order)
      NotificationServices::SendCustomerOrderEmail.send(@order.wholesale_profile.customer_profile, @order.wholesale_profile.roaster_profile, @order)
    end
  end
end
