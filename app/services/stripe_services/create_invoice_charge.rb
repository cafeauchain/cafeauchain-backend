module StripeServices
  class CreateInvoiceCharge
    
    def self.charge(invoice)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key

      account = invoice.order.wholesale_profile.roaster.stripe_account_id
      customer = invoice.order.customer_profile.stripe_customer_id
      application_fee = (invoice.total_in_cents * 0.02).to_i

      charge = Stripe::Charge.create({
        amount: invoice.total_in_cents,
        currency: 'usd',
        source: customer.default_source,
        application_fee_amount: application_fee
      }, account)

      invoice.update(status: :paid_in_full, stripe_invoice_id: charge.id)
      invoice.order.update(status: :paid_in_full)
    end
  end  
end