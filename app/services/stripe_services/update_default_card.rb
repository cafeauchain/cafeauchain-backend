module StripeServices
  class UpdateDefaultCard

    def self.call(subscription_id, stripe_card_id)
      @subscription = Subscription.find(subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key

      customer = Stripe::Customer.retrieve(@subscription.stripe_customer_id)
      customer.default_source = stripe_card_id
      if customer.save
        return true
      else
        return false
      end
    end
  end
end