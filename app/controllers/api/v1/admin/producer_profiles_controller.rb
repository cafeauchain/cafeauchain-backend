module Api::V1::Admin
  class ProducerProfilesController < ApplicationController

    def index
      if !params[:page].present?
        @producers = ProducerProfile.page(params[:page_number]).per(15)
      else
        @producers = ProducerProfile.page(params[:page_number]).per(15)
      end
      
      total_pages = (ProducerProfile.all.count / 15.to_f).ceil

      render json: @producers,
        meta: {
          pagination: {
            perpage: 15,
            totalpages: total_pages,
            totalobjects: ProducerProfile.all.count
          }
        }
    end

    def create
      @producer = ProducerProfile.new(producer_params)
      if @producer.save!
        render json: {"redirect":true, "redirect_url": "/admin/producers", producers: @producers}, status: 200
      end
    end

    def upload_csv
      csv_text = File.read(params[:file].tempfile)
      csv = CSV.parse(csv_text, :headers => true)
      csv.each do |row|
        puts row.to_hash
      end
      render json: {message: "Uploaded"}, status: 200
    end
    

    private

    def producer_params
      params.require(:producer_profile).permit(:name, :location, :url)
    end
    
  end
end