module StripeServices
  class RemoveCard

    def self.call(subscription_id, stripe_card_id)
      @subscription = Subscription.find(subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key

      customer = Stripe::Customer.retrieve(@subscription.stripe_customer_id)
      card = customer.sources.retrieve(stripe_card_id).delete
      if card.deleted?
        return true
      else
        return false
      end
    end
  end
end