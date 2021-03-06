module Api::V1::Admin
  class ProducerProfilesController < ApplicationController

    def index
      @producers = ProducerProfile.page(params[:page_number]).per(15)
      total_pages = (ProducerProfile.all.count / params[:page_size].to_f).ceil

      render json: @producers,
        meta: {
          pagination: {
            pagenumber: params[:page_number].to_f,
            pagesize: params[:page_size].to_f,
            totalpages: total_pages,
            totalobjects: ProducerProfile.all.count
          }
        }
    end

    def create
      @producer = ProducerProfile.new(producer_params)
      if @producer.save
        render json: {"redirect":true, "redirect_url": "/admin/producers", producer: @producer}, status: 200
      else
        render json: {errors: @producer.errors}, status: 422
      end
    end

    def upload_csv
      @import = ImportServices::ImportProducers.import(params[:file].tempfile)
      if @import
        @producers = ProducerProfile.page(1).per(15)
        total_pages = (ProducerProfile.all.count / 15.to_f).ceil

        render json: @producers,
          meta: {
            pagination: {
              perpage: 15,
              totalpages: total_pages,
              totalobjects: ProducerProfile.all.count
            },
            import: @import
          }, status: 200
      else
        render json: @import, status: 422
      end
    end


    private

    def producer_params
      params.require(:producer_profile).permit(:name, :location, addresses_attributes: [:street_1, :street_2, :city, :state, :postal_code, :country, :primary])
    end

  end
end
