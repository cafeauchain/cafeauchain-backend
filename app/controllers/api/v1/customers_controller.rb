module Api::V1
  class CustomersController < ApplicationController
    before_action :set_roaster
    before_action :set_customer, only: [:show, :update, :add_logo, :update_address]

    def index
      @customers = @roaster.customer_profiles
      render json: @customers, status: 200, each_serializer: CustomerSerializer
    end

    def show
      render json: @customer, status: 200, serializer: CustomerSerializer::SingleCustomerSerializer
    end

    def create
    end

    def update
      wp = @customer.wholesale_profiles.find_by(roaster_profile: @roaster);
      owner = @customer.owner
      @customer.addresses.update(primary_location: false)
      address = address_params
      address["country"] = "USA"
      address["primary_location"] = true
      address["location_label"] = "Office"
      current_address = @customer.addresses.find_by(street_1: address["street_1"], postal_code: address["postal_code"] )
      if current_address.present?
        current_address.update(address)
      else
        @customer.addresses.create(address)
      end

      if @customer.update!(customer_params) && wp.update!(wholesale_params) && owner.update!(owner_params)
        # TODO We probably need a better check of the side of the app than "current_roaster"
        # Customer Side
        if current_roaster.present?
          render json: { redirect: false, redirect_url: root_path(@roaster) }, status: 200
        # Roaster/Admin Side
        else
          render json: { redirect: true, redirect_url: manage_customers_path(@roaster) }, status: 200
        end
      else
        render json: @customer.errors.full_messages, status: 422
      end
    end

    def cards
      begin
        StripeServices::CreateCard.call(nil, @customer_profile.id, params[:token], params[:setAsDefault])
        render json: @roaster_profile.subscription.cards, status: 200
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def add_logo
      ActiveStorageServices::ImageAttachment.new(params[:logo], @customer.id, "CustomerProfile", "logo").callAsFile
      render json: {data: "success"}, status: 200
    end

    def update_address
      address = address_params
      if params[:primary_location]
        @customer.addresses.update(primary_location: false)
        address["primary_location"] = true
      end
      address["country"] = "USA"
      address["location_label"] = params[:location_label]
      current_address = @customer.addresses.find_by(addressable_id: params[:addressable_id], addressable_type: params[:addressable_type])
      if current_address.present?
        current_address.update(address)
        method = "update"
      else
        @customer.addresses.create(address)
        method = "create"
      end

      @serCust = ActiveModel::SerializableResource.new(@customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)

      render json: { customer: @serCust, params: params, address: address, current_address: current_address, method: method }, status: 200 
    end

    private

    def set_roaster
      @roaster = current_user.roaster_profile || current_roaster
    end

    def set_customer
      @customer = CustomerProfile.find(params[:id])
    end

    def customer_params
      params.permit(:company_name, :email)
    end

    def owner_params
      params.permit(:name)
    end

    def wholesale_params
      params.permit(:terms)
    end

    def address_params
      params.permit(:street_1, :street_2, :city, :state, :postal_code)
    end
  end
end
