module OrderServices
  class ProcessOrder
    def self.process(order_id, payment_type)
      @order = Order.find(order_id)
      @invoice = @order.invoice
      @order.update(status: :awaiting_payment)
      NotificationServices::SendRoasterOrderEmail.send(@order.wholesale_profile.roaster_profile, @order.wholesale_profile.customer_profile, @order)
      if payment_type == "card_on_file"
        @charge = StripeServices::CreateInvoiceCharge.charge(@invoice)
      else
        @invoice.update(status: :awaiting_payment)
      end
      InventoryServices::UpdateProductInventoryFromOrder.update(@order)
      NotificationServices::SendCustomerOrderEmail.send(@order.wholesale_profile.customer_profile, @order.wholesale_profile.roaster_profile, @order)
    end
  end
end
