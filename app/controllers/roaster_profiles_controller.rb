# TODO Consider moving this under the Manage namespace
# Or at least update the url to be something like /manage/profile
class RoasterProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_roaster, except: [:index, :new]

  def index
    @roaster_profiles = RoasterProfile.all
    render "manage/primary", locals: {
      profiles: @roaster_profiles,
      roaster: @roaster,
      title: 'Roasters',
      component: 'roaster_profile/profiles'
    }
  end

  def show
    roaster = ActiveModelSerializers::SerializableResource.new(@roaster, serializer: RoasterSerializer)
    render "manage/primary", locals: {
      roaster: @roaster,
      profile: roaster,
      title: 'Roaster',
      component: 'roaster_profile/profile'
    }
  end

  def new
    @roaster_profile = RoasterProfile.new
    render "manage/primary", locals: {
      roaster: @roaster,
      title: 'New Roaster',
      component: 'roaster_profile_wizard/App'
    }
  end

  def edit
    roaster = ActiveModelSerializers::SerializableResource.new(@roaster, serializer: RoasterSerializer)
    render "manage/primary", locals: {
      roaster: @roaster,
      profile: roaster,
      title: 'Edit Profile',
      component: 'roaster_profile/edit'
    }
  end

  def dashboard
  end

  private

  def set_roaster
    @roaster = current_user.roaster_profile
  end
end
