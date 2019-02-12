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
          quantity = additional_pounds.to_i
          stripe_sub = Stripe::Subscription.retrieve(subscription.stripe_subscription_id)
          sub_items = stripe_sub.items.data.select{ |si| si.plan.id == plan.stripe_plan_id}
          sub_item_id = sub_items.first.id
          if sub_items.empty?
            stripe_sub.items = [
              {plan: plan.stripe_plan_id}
            ]
            stripe_sub.save
            sub_item = stripe_sub.items.data.select{ |si| si.plan.id == plan.stripe_plan_id}
            sub_item_id = sub_item.first.id
          end
          Stripe::UsageRecord.create(:quantity => quantity, :timestamp => Time.now.to_time.to_i, :subscription_item => sub_item_id)
          return subscription
        end
      end
    end
  end
end
