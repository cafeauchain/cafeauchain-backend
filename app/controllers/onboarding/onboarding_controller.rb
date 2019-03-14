module Onboarding
  class OnboardingController < ApplicationController
    before_action :set_roaster

    def profile
      # profile = ActiveModel::SerializableResource.new(@roaster, serializer: RoasterSerializer)
      render "manage/primary", locals: {
        roaster: @roaster,
        # profile: profile,
        user: current_user,
        title: 'Roaster Onboarding | Create Profile',
        component: 'roaster_onboarding/profile'
      }
    end

    def lots
      render "manage/primary", locals: {
        roaster: @roaster,
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

    private

    def set_roaster
      @roaster = current_user.roaster_profile
    end

  end
end
