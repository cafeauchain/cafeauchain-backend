module Onboarding
  class OnboardingController < ApplicationController
    before_action :authenticate_user!
    before_action :set_roaster

    def profile
      render "manage/primary", locals: {
        roaster: @roaster,
        user: current_user,
        title: 'Roaster Onboarding | Create Profile',
        component: 'roaster_onboarding/profile'
      }
    end

    def lots
      lots = @roaster.lots
      @lots = ActiveModelSerializers::SerializableResource.new(lots, each_serializer: LotSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        lots: @lots,
        title: 'Roaster Onboarding | Import Lots',
        component: 'roaster_onboarding/importLots'
      }
    end

    def roast_profiles
      render "manage/primary", locals: {
        roaster: @roaster,
        title: 'Roaster Onboarding | Roast Profiles',
        component: 'roaster_onboarding/roastProfiles'
      }
    end

    def wholesale_details
      render "manage/primary", locals: {
        roaster: @roaster,
        title: 'Roaster Onboarding | Wholesale Details',
        component: 'roaster_onboarding/wholesaleDetails'
      }
    end

    def wholesale_signup
      render "manage/primary", locals: {
        roaster: @roaster,
        addresses: @roaster.addresses,
        owner: @roaster.owner,
        title: 'Roaster Onboarding | Wholesale Signup',
        component: 'roaster_onboarding/wholesaleSignup'
      }
    end

    def shipping
      shipping_methods = @roaster.shipping_methods
      render "manage/primary", locals: {
        roaster: @roaster,
        shipping_methods: shipping_methods,
        title: 'Roaster Onboarding | Shipping',
        component: 'roaster_onboarding/shipping'
      }
    end

    def products
      render "manage/primary", locals: {
        roaster: @roaster,
        title: 'Roaster Onboarding | Create Products',
        component: 'roaster_onboarding/createProducts'
      }
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

  end
end
