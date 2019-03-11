module Manage
  class PrimaryController < ApplicationController
    before_action :set_roaster

    def dashboard
      render "manage/primary", locals: {
        roaster_profile_id: @roaster.slug,
        roaster: @roaster,
        title: 'Roaster Dashboard',
        component: 'roaster_tools/dashboard'
      }
    end

    def inventory
      render "manage/primary", locals: {
        roaster_profile_id: @roaster.slug,
        roaster: @roaster,
        title: 'Inventory Dashboard',
        component: 'roaster_tools/inventory'
      }
    end

    def wholesale
      @wholesale_profiles = @roaster.wholesale_profiles
      orders = @roaster.orders
      @orders = ActiveModel::SerializableResource.new(orders, each_serializer: OrderSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        wholesalers: @wholesale_profiles,
        orders: @orders,
        title: 'Wholesale Dashboard',
        component: 'wholesale'
      }
    end

    def subscription
      subscription = Subscription.includes(:subscription_items).find_by(user: @roaster.owner)
      @subscription = ActiveModel::SerializableResource.new(subscription)
      @cards = subscription.cards
      render "manage/primary", locals: {
        roaster: @roaster,
        roasterId: @roaster.id,
        title: 'Manage Subscription',
        component: 'payments/App',
        stripeApiKey: Rails.application.credentials.stripe_api_key,
        cards: @cards,
        subscription: @subscription,
        scripts: ["https://js.stripe.com/v3/"]
      }
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

  end
end
