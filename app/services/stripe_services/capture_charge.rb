class StripeServices::CaptureCharge
  
  def capture(order)
    Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

    @charge_id = order.invoice.stripe_charge_id
    stripe_charge = Stripe::Charge.capture(@charge_id)
    if stripe_charge
      order.invoice.update(status: :paid_in_full)
    end

  end
  
end