module StripeServices
  class CreateInvoiceCharge
    
    def self.charge(invoice, payment_source)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

      account = invoice.order.wholesale_profile.roaster_profile.stripe_account_id
      customer_id = invoice.order.customer_profile.stripe_customer_id
      customer  = Stripe::Customer.retrieve(customer_id)
      # TODO Should this actually be (invoice.total_in_cents * .05) - (invoice.total_in_cents * 0.029 + 30)
      # if we are charging a flat 5% on all transactions?
      application_fee = ((invoice.total_in_cents * 0.05) - (invoice.total_in_cents * 0.029 + 30)).to_i
      source = payment_source || customer.default_source

      charge = Stripe::Charge.create({
        amount: invoice.total_in_cents,
        currency: 'usd',
        source: source,
        customer: customer_id,
        application_fee_amount: application_fee,
        destination: account
      })

      invoice.update(status: :paid_in_full, stripe_invoice_id: charge.id)
      invoice.order.update(status: :paid_in_full)
    end
  end  
end