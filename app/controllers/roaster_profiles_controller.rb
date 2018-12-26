class RoasterProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_roaster_profile, only: [:show, :edit, :update, :destroy]
  layout :devise

  # GET /roaster_profiles
  # GET /roaster_profiles.json
  def index
  end

  # GET /roaster_profiles/1
  # GET /roaster_profiles/1.json
  def show
  end

  # GET /roaster_profiles/new
  def new
  end

  # GET /roaster_profiles/1/edit
  def edit
  end

  # POST /roaster_profiles
  # POST /roaster_profiles.json
  def create
  end

  # PATCH/PUT /roaster_profiles/1
  # PATCH/PUT /roaster_profiles/1.json
  def update
  end

  # DELETE /roaster_profiles/1
  # DELETE /roaster_profiles/1.json
  def destroy
  end

  private
  
  # Use callbacks to share common setup or constraints between actions.
  def set_roaster_profile
    @roaster_profile = RoasterProfile.friendly.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def roaster_profile_params
    params.require(:roaster_profile).permit(:name, :location, :slug, :url, :twitter, :facebook)
  end
end
