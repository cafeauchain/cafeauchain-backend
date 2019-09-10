module Api::V1
  class CustomersController < ApplicationController
    before_action :set_roaster
    before_action :set_customer, except: [:index, :create]

    def index
      @customers = @roaster.customer_profiles
      render json: @customers, status: 200, each_serializer: CustomerSerializer, scope: @roaster
    end

    def show
      render json: @customer, status: 200, serializer: CustomerSerializer::SingleCustomerSerializer
    end

    def create
      begin
        existing_user = User.find_by(email: params[:email])
        existing_customer = CustomerProfile.find_by(email: params[:email])
        
        if existing_user.blank?
            user = User.create!(email: params[:email], name: params[:name], password: @roaster.slug)  
        else
          user = existing_user
        end

        if existing_customer.blank?
          customer = CustomerProfile.create!(owner: user, email: params[:email], company_name: params[:company_name])
        else
          customer = existing_customer
        end
        
        existing_wholesale = WholesaleProfile.find_by(roaster_profile: @roaster, customer_profile: customer)
        if existing_wholesale.blank?
          user.update(customer_profile: customer)
          wp = customer.wholesale_profiles.create(roaster_profile: @roaster)
          wp.create_cart
          wp.update(onboard_status: 'profile')

          # Send Welcome Email
          user[:roaster_profile_id] = @roaster.id
          user.send_reset_password_instructions
          # End Send Welcome Email

          @customers = @roaster.customer_profiles
          render json: @customers, status: 200, each_serializer: CustomerSerializer, scope: @roaster
        else
          customer.errors.add(:customer, "already exists")
          render json: customer.errors.full_messages, status: 409
        end
      rescue => exception
        render json: [exception], status: 422
      end
    end

    def update
      wp = @customer.wholesale_profiles.find_by(roaster_profile: @roaster);
      owner = @customer.owner
      address = address_params
      if address.present?
        @customer.addresses.update(primary_location: false)
        address["country"] = "USA"
        address["primary_location"] = true
        
        current_address = @customer.addresses.find_by(street_1: address["street_1"], postal_code: address["postal_code"] )
        if current_address.present?
          current_address.update(address)
        else
          address["location_label"] = "Office"
          @customer.addresses.create(address)
        end
      end

      if @customer.update!(customer_params) && wp.update!(wholesale_params) && owner.update!(owner_params)
        # TODO We probably need a better check of the side of the app than "current_roaster"
        # Customer Side
        if current_roaster.present?
          if params[:onboard].present?
            wp.update(onboard_status: 'addresses')
            render json: { redirect: true, redirect_url: shop_onboard_addresses_path }, status: 200
          else
            render json: { redirect: false, redirect_url: root_path(@roaster) }, status: 200
          end
        # Roaster/Admin Side
        else
          @serCustomer = ActiveModelSerializers::SerializableResource.new(@customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
          render json: { customer: @serCustomer }, status: 200
        end
      else
        render json: @customer.errors.full_messages, status: 422
      end
    end

    def cards
      begin
        StripeServices::CreateCard.call(nil, @customer.id, params[:token], params[:setAsDefault])
        render json: @customer.cards, status: 200
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def set_as_default
      begin
        @card = Card.find(params[:card_id])
        if @card.update(default: true)
          StripeServices::UpdateDefaultCard.call(nil, @customer.id, @card.stripe_card_id)
          render json: @customer.cards, status: 200
        else
          render json: @card.errors, status: 422
        end
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def remove_card
      begin
        @card = Card.find(params[:card_id])
        # if @roaster_profile.subscription.default_card != @card
        StripeServices::RemoveCard.call(nil, @customer.id, @card.stripe_card_id)
        @card.destroy
        render json: @customer.cards, status: 200
        # else
        #   @card.errors.add(:base, "Cannot remove default card; please set another card as default first.")
        #   puts @card.errors.full_messages
        #   render json: @card.errors, status: 422
        # end
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def add_logo
      # ActiveStorageServices::ImageAttachment.new(params[:logo], @customer.id, "CustomerProfile", "logo").callAsFile
      @customer.logo.attach(params[:logo])
      render json: {data: "success"}, status: 200
    end

    def update_address
      # TODO Consider moving this to another/its own controller because of id/customer_id conflict
      address = address_params
      if params[:primary_location]
        @customer.addresses.update(primary_location: false)
        address["primary_location"] = true
      end
      address["country"] = "USA"
      address["location_label"] = params[:location_label]
      current_address = @customer.addresses.find_by(id: params[:id])
      if current_address.present?
        current_address.update(address)
      else
        @customer.addresses.create(address)
      end
      # Have to do it this way because primary address was not being set.
      # Probably a race condition
      render json: CustomerProfile.find(params[:customer_id]), status: 200, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster
    end

    def update_onboard_status
      wp = @customer.wholesale_profiles.where(roaster_profile: @roaster)
      wp.update(onboard_status: params[:status])
      if params[:status] == 'approved'
        @serCust = ActiveModelSerializers::SerializableResource.new(@customer, serializer: CustomerSerializer::SingleCustomerSerializer, scope: @roaster)
        render json: {customer: @serCust}, status: 200
      else
        render json: {redirect: true, redirect_url: send("shop_onboard_#{params[:status]}_path")}, status: 200
      end
    end

    def set_shipping_default
      wp = @customer.wholesale_profiles.where(roaster_profile: @roaster)
      wp.update(shipping: params[:shipping_id])
      render json: {success: true}, status: 200
    end

    def process_payment
      begin
        @order = @customer.orders.find(params[:order_id])
        if !params[:card].nil?
          StripeServices::CreateInvoiceCharge.charge(@order.invoice, params[:card], true)  
        else
          StripeServices::CaptureCharge.capture(@order)
        end
        
        render json: @order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
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
      @roaster = current_user.roaster_profile || current_roaster
    end

    def set_customer
      begin
        if params[:customer_id].present?
          @customer = @roaster.customer_profiles.find(params[:customer_id])
        else
          @customer = @roaster.customer_profiles.find(params[:id]) 
        end
      rescue => exception
        return render json: { error: "Customer not found", exception: exception, message: "Customer not found" }, status: 404
      end
      
    end

    def customer_params
      params.permit(:company_name, :email)
    end

    def owner_params
      params.permit(:name)
    end

    def wholesale_params
      params.permit(:terms, :tax_rate, :onboard_status, :cust_discount)
    end

    def address_params
      params.permit(:street_1, :street_2, :city, :state, :postal_code)
    end
  end
end
