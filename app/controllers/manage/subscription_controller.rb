# TODO This can probably be deleted
module Manage
  class SubscriptionController < ApplicationController

    def index
      @roaster_profile = current_user.roaster_profile
      subscription = Subscription.includes(:subscription_items).find_by(user: @roaster_profile.owner)
      @subscription = ActiveModel::SerializableResource.new(subscription)
      @cards = subscription.cards
      render "roaster_profiles/manage_subscription"
    end

  end
end
