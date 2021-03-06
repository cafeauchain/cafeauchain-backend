# TODO This probably should be deleted since we arent offering a separate wholesale option
module StripeServices
  class EnrollWholesaleSubscription
    def initialize(subscription_id)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      @plan = Plan.find_by(name: 'Proof of Perk Wholesale Lite')
      @sub = Subscription.find(subscription_id)
    end

    def enroll
      Stripe::Subscription.update(@sub.stripe_subscription_id,
        items: [
          {plan: @plan.stripe_plan_id, quantity: 1}
        ])
      SubscriptionItem.create(subscription: @sub, plan: @plan, quantity: 1)
    end
    
  end  
end