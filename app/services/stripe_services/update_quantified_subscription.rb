module StripeServices
  class UpdateQuantifiedSubscription

    def self.update(user_id, subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key
      plan = Plan.find_by(name: 'Proof of Perk Usage')
      user = User.find(user_id)
      subscription = user.subscription

      if user.roaster_profile.lots.count > 0
        pounds_roasted_in_period = user.roaster_profile.amount_roasted_in_period(subscription.id)
        base_roasted = 500
        additional_pounds = pounds_roasted_in_period.to_f - base_roasted.to_f

        if additional_pounds > 0
          quantity = (additional_pounds / 100.0).ceil
          stripe_sub = Stripe::Subscription.retrieve(subscription.stripe_subscription_id)
          stripe_sub.items = [
            {plan: plan.stripe_plan_id, quantity: quantity}
          ]
          stripe_sub.prorate = false
          stripe_sub.save
            # billing_cycle_anchor: subscription.trial_end.to_i,
            # cancel_at_period_end: true
          subscription.subscription_items.create(plan: plan, quantity: quantity)
        end
      end
    end
  end
end