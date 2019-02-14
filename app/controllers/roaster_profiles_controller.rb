class RoasterProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_roaster_profile, only: [:show, :edit, :update, :destroy, :dashboard, :manage_subscription, :manage_inventory]
  layout "devise"

  # GET /roaster_profiles
  # GET /roaster_profiles.json
  def index
      @roaster_profiles = RoasterProfile.all
  end

  # GET /roaster_profiles/1
  # GET /roaster_profiles/1.json
  def show
  end

  # GET /roaster_profiles/new
  def new
    @roaster_profile = RoasterProfile.new
  end

  # GET /roaster_profiles/1/edit
  def edit
  end

  # PATCH/PUT /roaster_profiles/1
  # PATCH/PUT /roaster_profiles/1.json
  def update
  end

  # DELETE /roaster_profiles/1
  # DELETE /roaster_profiles/1.json
  def destroy
  end

  def dashboard

  end

  def manage_inventory

  end


  def manage_subscription
    subscription = Subscription.includes(:subscription_items).find_by(user: @roaster_profile.owner)
    @subscription = ActiveModel::SerializableResource.new(subscription)
    @cards = subscription.cards
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_roaster_profile
    @roaster_profile = RoasterProfile.friendly.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def roaster_profile_params
    params.require(:roaster_profile).permit(:name, :address_1, :address_2, :zip_code, :city, :state, :about, :slug, :url, :twitter, :facebook)
  end
end
