require 'easypost'

module ShippingServices
  class AddCarrierAccount

    def initialize(params, roaster_id)
      EasyPost.api_key = Rails.application.credentials.easypost_api_key
      @account_id = params[:account_id] # account id for carrier
      @username = params[:username]     # username for carrier
      @password = params[:password]     # password for carrier - not stored
      @carrier = params[:carrier]       # string value of carrier for ShippingMethod enum
      @roaster = RoasterProfile.find(roaster_id)
      case @carrier
      when "ups"
        @credentials = {
          account_number: @account_id,
          user_id: @username,
          password: @password,
          access_license_number: params[:access_license_number]
        }
        @friendly_name = 'UPS'
      when "usps"
        @credentials = {
          company_name: @roaster.name,
          address_street: "#{@roaster.primary_address.street_1} #{@roaster.primary_address.street_2}",
          address_city: @roaster.primary_address.city,
          address_state: @roaster.primary_address.state,
          address_zip: @roaster.primary_address.postal_code,
          email: @roaster.owner.email
        }
        @friendly_name = "USPS"
      when "fedex"
        @credentials = {
          account_number: @account_id,
          meter_number: params[:meter_number],
          key: @username,
          password: @password,
        }
        @friendly_name = "FedEx"
      else
        raise "Unknown carrier type"
      end

    end

    def call
      carrier_acct = EasyPost::CarrierAccount.create(
        type: "#{@carrier.humanize}Account",
        description: "#{@carrier.humanize} account for #{@roaster.name}",
        reference: "#{@carrier} #{@roaster.name}".parameterize,
        credentials: @credentials
      )
      shipping_method = @roaster.shipping_methods.create(carrier: @carrier, easy_post_account_ref: carrier_acct.id, friendly_name: @friendly_name, account_id: @account_id)
    end

  end
end