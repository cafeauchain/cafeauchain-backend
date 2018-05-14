class CropsController < ApplicationController
  def new
    @crop = Crop.new
    @farms = []
    ProducerProfile.all.each { |producer| @farms.push([producer.name, producer.id]) }
  end

  def create
    
  end
end
