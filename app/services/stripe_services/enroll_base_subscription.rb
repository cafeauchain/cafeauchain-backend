require 'stripe'

module StripeServices
  class EnrollBaseSubscription

    def self.initial_enroll(user_id)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      @plan = Plan.find_by(name: 'Proof of Perk Base')
      @user = User.find(user_id)
      @customers = Stripe::Customer.list
      @emails = @customers.pluck("email")
      begin
        if @emails.include?(@user.email)
          stripe_customer = @customers.find{ |customer| customer["id"] if customer["email"] == @user.email }
        else
          stripe_customer = Stripe::Customer.create({
            email: @user.email, 
            description: "Account for #{@user.roaster_profile.name}"
          })
          # stripe_customer = Stripe::Customer.retrieve(stripe_customer_id)
          # stripe_customer.coupon = 'yzjn1Zzr'
          # stripe_customer.save
          plans = Stripe::Plan.list(active: true).map{|item|
            {
              plan: item["id"],
              quantity: item["usage_type"] == "licensed" ? 1 : nil
            }
          }
          stripe_sub = Stripe::Subscription.create({
            customer: stripe_customer["id"], 
            items: plans, 
            billing_cycle_anchor: (Time.now.beginning_of_day + 1.month).to_time.to_i, 
            prorate: false
          })
          period_start = Time.at(stripe_sub["current_period_start"]).beginning_of_day
          period_end = Time.at(stripe_sub["current_period_end"])
          @subscription = @user.create_subscription(
            stripe_customer_id: stripe_customer["id"], 
            stripe_subscription_id: stripe_sub["id"], 
            subscription_start: Date.today,
            next_bill_date: period_end + 1.seconds, 
            period_start: period_start, 
            period_end: period_end
          )
          @subscription.data.items.each{|items|
            SubscriptionItem.create(
              subscription: @subscription, 
              stripe_meta_name: item[:plan][:metadata][:plan_name], 
              stripe_sub_item_id: item[:id],
              description: item[:plan][:metadata][:our_description],
              title: item[:plan][:nickname],
            )  
          }
          # TODO cant think of a reason why this would need to be called on signup
          # StripeServices::UpdateQuantifiedSubscription.update(user_id)

          # SubscriptionMailer.enroll_and_welcome(@user).deliver_now! # Send welcome email
          return @subscription
        end  
      rescue => exception
       return exception 
      end
    end

  end
end
