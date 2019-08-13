class StripeServices::CaptureCharge
  
  def self.capture(order)
    Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

    @charge_id = order.invoice[:stripe_invoice_id]
    stripe_charge = Stripe::Charge.capture({
      id: @charge_id,
      amount: order.invoice.total_in_cents,
      application_fee_amount: order.invoice.application_fee
    })
    if stripe_charge
      order.invoice.update(status: :paid_in_full, payment_status: :stripe)
      return true
    else
      return false
    end

  end

end