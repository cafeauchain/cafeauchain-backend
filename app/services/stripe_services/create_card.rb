require 'stripe'

module StripeServices
  class CreateCard

    def self.call(subscription_id, token)
      @subscription = Subscription.find(subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key

      customer = Stripe::Customer.retrieve(@subscription.stripe_customer_id)
      card = customer.sources.create(source: token)
      @subscription.cards.create(brand: card[:brand], stripe_card_id: card[:id], exp_month: card[:exp_month], exp_year: card[:exp_year], last4: card[:last4])
    end
  end
end