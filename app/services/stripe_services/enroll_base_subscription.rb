require 'stripe'

module StripeServices
  class EnrollBaseSubscription

    def self.enroll(user_id)
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
      @subscription = @user.create_subscription(stripe_customer_id: stripe_customer_id)
      SubscriptionItem.create(subscription: @subscription, plan: @plan, quantity: 1)
      Stripe::Subscription.create(customer: stripe_customer_id, trial_from_plan: true, items: [
        {plan: @plan.stripe_plan_id}
      ])
    end
    
  end
end