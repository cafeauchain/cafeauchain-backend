module StripeServices
  class CreateInvoiceCharge
    
    def self.charge(invoice, payment_source, capture = false)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

      account = invoice.order.wholesale_profile.roaster_profile.stripe_account_id
      customer_id = invoice.order.customer_profile.stripe_customer_id
      customer  = Stripe::Customer.retrieve(customer_id)
      source = payment_source || customer.default_source
      statement_descriptor = invoice.order.wholesale_profile.roaster_profile.name[0..22]

      charge = Stripe::Charge.create({
        amount: invoice.total_in_cents,
        currency: 'usd',
        source: source,
        customer: customer_id,
        application_fee_amount: invoice.total_fee,
        statement_descriptor_suffix: statement_descriptor,
        destination: account,
        capture: capture
      })

      invoice_status = capture ? :paid_in_full : :payment_authorized
      payment_status = capture ? :stripe : nil
      memo = nil
      fee = nil
      paid_date = nil
      if capture
        card = charge[:payment_method_details][:card]
        memo = "Payment via Stripe"
        fee = (invoice.total_fee/100.0).round(2)
        if !card.nil?
          memo += " with " + card[:brand].to_s.capitalize + " " + card[:last4].to_s
        end
        paid_date = DateTime.now.to_date
      end

      invoice.update(
        status: invoice_status,
        stripe_invoice_id: charge.id,
        payment_status: payment_status,
        memo: memo,
        fee: fee,
        paid_date: paid_date
      )
    end
  end  
end
