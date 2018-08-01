class RoastController < ApplicationController

  def index
    @producers = ProducerProfile.all
    @options = @producers.collect { |p| [p.name, p.crops.pluck(:name, :id) ] }
    @options.prepend(["New crop", [["Create a new crop", 0]]])
  end

  def step_1
    if params[:id] == "0"
      @producer = ProducerProfile.new
    else
      @crop = Crop.find(params[:id])
    end
    @producers = []
    ProducerProfile.all.each { |producer| @producers.push([producer.name, producer.id]) }
    @producers.prepend(["Create a new Producer", ""])
  end

  def step_2
    @crop = Crop.find(params[:crop_id])
    if @crop.nil?
      @producer = ProducerProfile.find(params[:producer_profile][:crop_producer])
      if @producer.nil?

      end
      @crop = @producer.crops.create(name: params[:producer_profile][:crop_name] ,crop_year: params[:producer_profile][:crop_year],
              harvest_season: params[:producer_profile][:harvest_season], country: params[:producer_profile][:country],
              region: params[:producer_profile][:region], varietal: params[:producer_profile][:varietal], process: params[:producer_profile][:process],
              altitude: params[:producer_profile][:altitude])
    end
    @lot = @crop.lots.new
    @options = @crop.lots.where(roaster_profile_id: current_user.roaster_profile.id).collect{ |l| ["#{l.pounds_of_coffee} lbs - $#{l.price_per_pound}", l.id]}
  end

  def step_3
    @crop = Crop.find(params[:crop_id])
    if params[:lot_select].blank?
      @lot = @crop.lots.create(lot_params)
      @lot.update(roaster_profile_id: current_user.roaster_profile.id)
    else
      @lot = Lot.find(params[:lot_select])
    end
    @batch = @lot.batches.create(starting_amount: params[:lot][:starting_amount], ending_amount: params[:lot][:ending_amount]) 
    @starting_roast_weight = @lot.batches.pluck(:starting_amount).sum
    @roasted = @lot.batches.pluck(:ending_amount).sum # need to add ending amount field
    puts @lot.pounds_of_coffee
    puts @roasted
    @chaff = @lot.pounds_of_coffee - @roasted
  end

  def load_lot
    @lot = Lot.find(params[:id])
  end

  def new_lot
  end
  
  private

  def lot_params
    params.require(:lot).permit(:pounds_of_coffee, :price_per_pound)
  end
end