module Api::V1
  class CustomersController < ApplicationController
    before_action :set_roaster
    before_action :set_customer, only: [:show, :update]

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
      if @customer.update!(customer_params) && wp.update!(wholesale_params) && owner.update!(owner_params)
        render json: @customer, status: 200, serializer: CustomerSerializer::SingleCustomerSerializer
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

    private

    def set_roaster
      @roaster = current_user.roaster_profile
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
  end
end
