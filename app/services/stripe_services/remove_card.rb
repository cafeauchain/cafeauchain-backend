module StripeServices
  class RemoveCard

    def self.call(subscription_id, customer_profile_id, stripe_card_id)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      if !subscription_id.nil?
        @chargeable = Subscription.find(subscription_id)
      else
        @chargeable = CustomerProfile.find(customer_profile_id)
      end

      customer = Stripe::Customer.retrieve(@chargeable.stripe_customer_id)
      card = customer.sources.retrieve(stripe_card_id).delete
      if card.deleted?
        return true
      else
        return false
      end
    end
  end
end