require 'stripe'

module StripeServices
  class CreateCard

    def self.call(subscription_id, token, setAsDefault)
      @subscription = Subscription.find(subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key

      customer = Stripe::Customer.retrieve(@subscription.stripe_customer_id)
      stripe_card = customer.sources.create(source: token)
      if setAsDefault
        @subscription.cards.where(default: true).each{ |card| card.update(default: false)}
        customer.default_source = stripe_card[:id]
        customer.save
      end
      @card = @subscription.cards.create(
        brand: stripe_card[:brand],
        stripe_card_id: stripe_card[:id],
        exp_month: stripe_card[:exp_month],
        exp_year: stripe_card[:exp_year],
        last4: stripe_card[:last4],
        default: setAsDefault
      )
    end
  end
end
