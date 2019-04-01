# TODO Consider moving this under the Manage namespace
# Or at least update the url to be something like /manage/profile
class RoasterProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_roaster_profile, except: [:index, :new]

  def index
    @roaster_profiles = RoasterProfile.all
    render "manage/primary", locals: {
      profiles: @roaster_profiles,
      roaster: current_user.roaster_profile,
      title: 'Roasters',
      component: 'roaster_profile/profiles'
    }
  end

  def show
    roaster = ActiveModel::SerializableResource.new(@roaster_profile, serializer: RoasterSerializer)
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      profile: roaster,
      title: 'Roaster',
      component: 'roaster_profile/profile'
    }
  end

  def new
    @roaster_profile = RoasterProfile.new
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      title: 'New Roaster',
      component: 'roaster_profile_wizard/App'
    }
  end

  def edit
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      title: 'Edit Profile',
      component: 'roaster_profile/edit'
    }
  end

  def dashboard
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_roaster_profile
    @roaster_profile = current_user.roaster_profile
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  # def roaster_profile_params
  #   params.require(:roaster_profile).permit(:name, :address_1, :address_2, :zip_code, :city, :state, :about, :slug, :url, :twitter, :facebook)
  # end
end
