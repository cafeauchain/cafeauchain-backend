class ProducerProfilesController < ApplicationController

  def index
  end
  
  def new
  end

  def create
  end

  def show
  end
  
  private

  def set_producer_profile
    @producer = ProducerProfile.friendly.find(params[:id])
  end

  def producer_profile_params
    params.require(:producer_profile).permit(:name, :location, :latitude, :longitude)
  end
  
end