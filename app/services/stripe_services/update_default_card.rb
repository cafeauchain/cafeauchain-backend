module StripeServices
  class UpdateDefaultCard

    def self.call(subscription_id, customer_profile_id, stripe_card_id)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key

      if !subscription_id.nil?
        @chargeable = Subscription.find(subscription_id)
      else
        @chargeable = CustomerProfile.find(customer_profile_id)
      end

      customer = Stripe::Customer.retrieve(@chargeable.stripe_customer_id)
      customer.default_source = stripe_card_id
      @chargeable.cards.where(default: true).each{ |card| card.update(default: false)}
      @chargeable.cards.find_by(stripe_card_id: stripe_card_id).update(default: true)
      if customer.save
        return true
      else
        return false
      end
    end
  end
end
