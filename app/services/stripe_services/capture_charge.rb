class StripeServices::CaptureCharge
  
  def self.capture(order)
    begin
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]

      @charge_id = order.invoice[:stripe_invoice_id]
      charge = Stripe::Charge.capture(@charge_id, {
        amount: order.invoice.total_in_cents,
        application_fee_amount: order.invoice.application_fee
      })

      card = charge[:payment_method_details][:card]
      memo = "Payment via Stripe"
      fee = (order.invoice.total_fee/100).round(2)
      if !card.nil?
        memo += " with " + card[:brand].to_s.capitalize + " " + card[:last4].to_s
      end

      order.invoice.update(status: :paid_in_full, payment_status: :stripe, memo: memo, fee: fee )
    rescue => exception
      return { message: e.message, status: e.http_status }
    end
  end

end