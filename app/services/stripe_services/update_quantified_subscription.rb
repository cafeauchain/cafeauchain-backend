module StripeServices
  class UpdateQuantifiedSubscription

    def self.update(user_id)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      user = User.find(user_id)
      subscription = user.subscription

      if user.roaster_profile.lots.count > 0
        pounds_roasted_in_period = user.roaster_profile.amount_roasted_in_period(subscription.id)
        base_roasted = 500
        additional_pounds = pounds_roasted_in_period.to_f - base_roasted.to_f

        if additional_pounds > 0
          quantity = additional_pounds.to_i
          sub_item = subscription.subscription_items.find{|item| item[:stripe_meta_name] == "usage" }
          if !sub_item.nil?
            sub_item_id = sub_item[:stripe_sub_item_id]
          else
            stripe_subscription = Stripe::Subscription.retrieve(subscription[:stripe_subscription_id])
            temp = stripe_subscription.items.data.find{|item| item[:plan][:metadata][:plan_name] == "usage"}
            sub_item_id = temp[:id]
          end
          Stripe::UsageRecord.create({
            quantity: quantity, 
            timestamp: Time.now.to_time.to_i, 
            subscription_item: sub_item_id
          })
          return subscription
        end
      end
    end
  end
end
