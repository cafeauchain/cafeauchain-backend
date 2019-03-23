require 'stripe'

module StripeServices
  class CreateCard

    def self.call(subscription_id, customer_profile_id, token, setAsDefault)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key
      if !subscription_id.nil?
        @chargeable = Subscription.find(subscription_id)
      else
        @chargeable = CustomerProfile.find(customer_profile_id)
        if @chargeable.stripe_customer_id.nil? || @chargeable.stripe_customer_id.blank?
          customer = Stripe::Customer.create({
            email: @chargeable.email, # will change to customer
            description: "Account for wholesale customer #{@chargeable.company_name}"
          })
          @chargeable.update(stripe_customer_id: customer.id)
        end
      end
      customer = Stripe::Customer.retrieve(@chargeable.stripe_customer_id)
      stripe_card = customer.sources.create(source: token)
      if setAsDefault
        @chargeable.cards.where(default: true).each{ |card| card.update(default: false)}
        customer.default_source = stripe_card[:id]
        customer.save
      end
      @card = @chargeable.cards.create(
        brand: stripe_card[:brand],
        stripe_card_id: stripe_card[:id],
        exp_month: stripe_card[:exp_month],
        exp_year: stripe_card[:exp_year],
        last4: stripe_card[:last4],
        default: setAsDefault,
        name: stripe_card[:name]
      )
    end
  end
end
