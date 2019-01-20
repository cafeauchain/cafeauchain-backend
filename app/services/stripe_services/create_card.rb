require 'stripe'

module StripeServices
  class CreateCard

    def self.call(subscription_id, token)
      @subscription = Subscription.find(subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key

      customer = Stripe::Customer.retrieve(@subscription.stripe_customer_id)
      stripe_card = customer.sources.create(source: token)
      @card = @subscription.cards.create(brand: stripe_card[:brand], stripe_card_id: stripe_card[:id], exp_month: stripe_card[:exp_month], exp_year: stripe_card[:exp_year], last4: stripe_card[:last4])
      if @card.stripe_card_id == customer.default_source
        @card.update(default: true)
      end
    end
  end
end