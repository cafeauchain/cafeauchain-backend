module StripeServices
  class UpdateQuantifiedSubscription

    def self.update(user_id, subscription_id)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key
      plan = Plan.find_by(name: 'Proof of Perk Usage')
      user = User.find(user_id)
      subscription = user.subscription

      if user.roaster_profile.lots.count > 0
        pounds_roasted_in_period = user.roaster_profile.amount_roasted_in_period(subscription.id)
        base_roasted = 500
        additional_pounds = pounds_roasted_in_period.to_f - base_roasted.to_f

        if additional_pounds > 0
          quantity = additional_pounds.to_i
          stripe_sub = Stripe::Subscription.retrieve(subscription.stripe_subscription_id)
          sub_item_id = subscription.find_subscription_item_id(stripe_sub, plan.stripe_plan_id)
          Stripe::UsageRecord.create(:quantity => quantity, :timestamp => Time.now.to_time.to_i, :subscription_item => sub_item_id)
          return subscription
        end
      end
    end
  end
end
