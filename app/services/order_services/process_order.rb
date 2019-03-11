module OrderServices
  class ProcessOrder
    
    def self.process(order_id, payment_type)
      @order = Order.find(order_id)
      @invoice = @order.invoice
      @order.update(status: :awaiting_payment)
      if payment_type == "card_on_file"
        @charge = StripeServices::CreateInvoiceCharge.charge(@invoice)
      else
        @invoice.update(status: :awaiting_payment)
      end
      InventoryServices::UpdateVariantInventory.update(@order)
    end
  end
end