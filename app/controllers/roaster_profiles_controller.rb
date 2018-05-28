class RoasterProfilesController < ApplicationController
  before_action :set_roaster_profile, only: [:show, :edit, :update, :destroy]

  # GET /roaster_profiles
  # GET /roaster_profiles.json
  def index
    if current_user.admin?
      @roaster_profiles = RoasterProfile.all
    else
      @roaster_profiles = [current_user.roaster_profile]
    end
  end

  # GET /roaster_profiles/1
  # GET /roaster_profiles/1.json
  def show
    @transactions = @roaster_profile.transactions
    @crops = @transactions.collect{ |t| t.crop }
  end

  # GET /roaster_profiles/new
  def new
    @roaster_profile = RoasterProfile.new
  end

  # GET /roaster_profiles/1/edit
  def edit
  end

  # POST /roaster_profiles
  # POST /roaster_profiles.json
  def create
    @roaster_profile = RoasterProfile.new(roaster_profile_params)

    respond_to do |format|
      if @roaster_profile.save
        current_user.update(roaster_profile: @roaster_profile)
        format.html { redirect_to @roaster_profile, notice: 'Roaster profile was successfully created.' }
        format.json { render :show, status: :created, location: @roaster_profile }
      else
        format.html { render :new }
        format.json { render json: @roaster_profile.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /roaster_profiles/1
  # PATCH/PUT /roaster_profiles/1.json
  def update
    respond_to do |format|
      if @roaster_profile.update(roaster_profile_params)
        format.html { redirect_to @roaster_profile, notice: 'Roaster profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @roaster_profile }
      else
        format.html { render :edit }
        format.json { render json: @roaster_profile.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /roaster_profiles/1
  # DELETE /roaster_profiles/1.json
  def destroy
    @roaster_profile.destroy
    respond_to do |format|
      format.html { redirect_to roaster_profiles_url, notice: 'Roaster profile was successfully destroyed.' }
      format.json { head :no_content }
    end
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
