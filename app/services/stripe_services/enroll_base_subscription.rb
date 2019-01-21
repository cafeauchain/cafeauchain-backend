require 'stripe'

module StripeServices
  class EnrollBaseSubscription

    def self.initial_enroll(user_id)
      Stripe.api_key = Rails.application.credentials.stripe_api_key
      @plan = Plan.find_by(name: 'Proof of Perk Base')
      @user = User.find(user_id)
      @customers = Stripe::Customer.list
      @emails = @customers.pluck("email")
      if @emails.include?(@user.email)
        stripe_customer_id = @customers.find{ |customer| customer["id"] if customer["email"] == @user.email }["id"]
      else
        stripe_customer_id = Stripe::Customer.create(description: "Account for #{@user.roaster_profile.name}")['id']
      end
      stripe_sub = Stripe::Subscription.create(customer: stripe_customer_id, trial_from_plan: true, items: [
        {plan: @plan.stripe_plan_id}
      ])
      @subscription = @user.create_subscription(stripe_customer_id: stripe_customer_id, stripe_subscription_id: stripe_sub["id"], trial_end: Time.at(stripe_sub["trial_end"]), status: "trial")
      SubscriptionItem.create(subscription: @subscription, plan: @plan, quantity: 1)
      # SubscriptionMailer.enroll_and_welcome(@user).deliver_now! # Send welcome email
    end
    
  end
end