class ProducerProfilesController < ApplicationController
  before_action :set_producer_profile, only: [:show]

  def index
    @producers = ProducerProfile.all
  end
  
  def new
    @producer = ProducerProfile.new
  end

  def create
    @producer = ProducerProfile.new(producer_profile_params)
    if @producer.save
      @producer.generate_port_numbers
      @producer.create_chain
      redirect_to @producer, success: "Producer added!"
    else
      render :new, error: "There was a problem with this submission."
    end
  end

  def show
    @producer = ProducerProfile.friendly.find(params[:id])
    @crops = @producer.crops
  end
  
  private

  def set_producer_profile
    @producer = ProducerProfile.friendly.find(params[:id])
  end

  def producer_profile_params
    params.require(:producer_profile).permit(:name, :location, :latitude, :longitude)
  end
  
end