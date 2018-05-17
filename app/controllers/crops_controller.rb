class CropsController < ApplicationController
  def new
    @crop = Crop.new
    @farms = []
    ProducerProfile.all.each { |producer| @farms.push([producer.name, producer.id]) }
  end

  def create
    if params[:crop][:crop_producer].blank?
      @producer = ProducerProfile.create(name: params[:crop][:name], location: params[:crop][:location],
                                         longitude: params[:crop][:longitude], latitude: params[:crop][:latitude])
    else
      @producer = ProducerProfile.find(params[:crop][:crop_producer])
    end
    @crop = @producer.crops.create(crop_year: params[:crop][:crop_year], zone: params[:crop][:zone],
                                   varietal: params[:crop][:varietal], bag_size: params[:crop][:bag_size],
                                   bags: params[:crop][:bags])
    if @crop.save
      service = MultichainServices::IssueAssetsService(@producer.rpc_port, @producer.wallet_address, @crop.bag_size, @crop.bags)
      redirect_to producer_profile_path(@producer), success: "Crop created"
    else
      render :new, notice: "Something went wrong."
    end
  end
end
