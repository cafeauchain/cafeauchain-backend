module StripeServices
  class CreateInvoiceCharge
    
    def self.charge(invoice, payment_source, capture = false)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

      account = invoice.order.wholesale_profile.roaster_profile.stripe_account_id
      customer_id = invoice.order.customer_profile.stripe_customer_id
      customer  = Stripe::Customer.retrieve(customer_id)
      source = payment_source || customer.default_source

      charge = Stripe::Charge.create({
        amount: invoice.total_in_cents,
        currency: 'usd',
        source: source,
        customer: customer_id,
        application_fee_amount: invoice.application_fee,
        destination: account,
        capture: capture
      })

      invoice_status = capture ? :paid_in_full : :payment_authorized
      payment_status = capture ? :stripe : nil

      invoice.update(status: invoice_status, stripe_invoice_id: charge.id, payment_status: payment_status)
    end
  end  
end
