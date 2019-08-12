class StripeServices::CaptureCharge
  
  def self.capture(order)
    Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

    @charge_id = order.invoice[:stripe_invoice_id]
    application_fee = ((order.invoice.total_in_cents * 0.034) - (order.invoice.total_in_cents * 0.029 + 30)).to_i
    if application_fee < 0
      application_fee = 0
    end
    stripe_charge = Stripe::Charge.capture({
      id: @charge_id,
      amount: order.invoice.total_in_cents,
      application_fee_amount: application_fee
    )}
    if stripe_charge
      order.invoice.update(status: :paid_in_full, payment_status: :stripe)
      return true
    else
      return false
    end

  end

end