module Manage
  class PrimaryController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def dashboard
      lots = ActiveModelSerializers::SerializableResource.new(@roaster.open_lots, each_serializer: LotSerializer)
      batches = @roaster.batches.where(status: :roast_in_progress)
      batches = ActiveModel::SerializableResource.new(batches, each_serializer: BatchSerializer)
      render "manage/primary", locals: {
        roaster_profile_id: @roaster.slug,
        roaster: @roaster,
        lots: lots,
        batches: batches,
        title: 'Roaster Dashboard',
        component: 'roaster_tools/dashboard'
      }
    end

    def inventory
      lots = ActiveModelSerializers::SerializableResource.new(@roaster.lots, each_serializer: LotSerializer)
      render "manage/primary", locals: {
        roaster_profile_id: @roaster.slug,
        roaster: @roaster,
        lots: lots,
        title: 'Inventory Dashboard',
        component: 'roaster_tools/inventory'
      }
    end

    def wholesale
      @wholesale_profiles = @roaster.wholesale_profiles
      customers = @roaster.customer_profiles
      render "manage/primary", locals: {
        roaster: @roaster,
        wholesalers: @wholesale_profiles,
        customers: customers,
        title: 'Wholesale Dashboard',
        component: 'wholesale'
      }
    end

    def subscription
      subscription = Subscription.includes(:subscription_items).find_by(user: @roaster.owner)
      @subscription = ActiveModelSerializers::SerializableResource.new(subscription)
      @cards = subscription.cards
      render "manage/primary", locals: {
        roaster: @roaster,
        roasterId: @roaster.id,
        title: 'Manage Subscription',
        component: 'payments/App',
        stripeApiKey: Rails.application.credentials[Rails.env.to_sym][:stripe_api_key],
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
