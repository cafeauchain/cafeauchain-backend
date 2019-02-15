require 'stripe'

module StripeServices
  class EnrollBaseSubscription

    def self.initial_enroll(user_id)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key
      @plan = Plan.find_by(name: 'Proof of Perk Base')
      @user = User.find(user_id)
      @customers = Stripe::Customer.list
      @emails = @customers.pluck("email")
      if @emails.include?(@user.email)
        stripe_customer_id = @customers.find{ |customer| customer["id"] if customer["email"] == @user.email }["id"]
      else
        stripe_customer_id = Stripe::Customer.create(description: "Account for #{@user.roaster_profile.name}")['id']
      end
      stripe_customer = Stripe::Customer.retrieve(stripe_customer_id)
      # stripe_customer.coupon = 'yzjn1Zzr'
      stripe_customer.save
      stripe_sub = Stripe::Subscription.create(customer: stripe_customer_id, items: [
        {plan: @plan.stripe_plan_id, quantity: 1}
      ], billing_cycle_anchor: (Time.now.beginning_of_day + 30.days).to_time.to_i, prorate: false)
      period_start = Time.at(stripe_sub["current_period_start"]).beginning_of_day
      period_end = Time.at(stripe_sub["current_period_end"])
      @subscription = @user.create_subscription(stripe_customer_id: stripe_customer_id, stripe_subscription_id: stripe_sub["id"], subscription_start: Date.today,
                                                next_bill_date: period_end + 1.seconds, period_start: period_start, period_end: period_end )
      SubscriptionItem.create(subscription: @subscription, plan: @plan, quantity: 1)
      StripeServices::UpdateQuantifiedSubscription.update(user_id, @subscription.id)
      # SubscriptionMailer.enroll_and_welcome(@user).deliver_now! # Send welcome email
      return @subscription
    end

  end
end
