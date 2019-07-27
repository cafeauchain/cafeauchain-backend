class ShippingServices::GetUpsRates

  def def initialize(roaster, customer, order)
    @server = UPS::Connection.new
    @roaster = roaster
    @customer = customer
    @order = order
  end

  def rates
    response = @server.rates do |rate_builder|
      rate_builder.add_access_request(Rails.application.credentials[Rails.env.to_sym][:ups_api_key], 
        Rails.application.credentials[Rails.env.to_sym][:ups_username], 
        Rails.application.credentials[Rails.env.to_sym][:ups_password])
      rate_builder.add_shipper(company_name: @roaster.name,
        # phone_number: '01792 123456',
        address_line_1: @roaster.primary_address.street_1,
        city: @roaster.primary_address.city,
        state: @roaster.primary_address.state,
        postal_code: @roaster.primary_address.postal_code,
        country: 'US',
        shipper_number: Rails.application.credentials[Rails.env.to_sym][:ups_account_number])
      rate_builder.add_ship_from(company_name: @roaster.name,
        # phone_number: '01792 123456',
        address_line_1: @roaster.primary_address.street_1,
        city: @roaster.primary_address.city,
        state: @roaster.primary_address.state,
        postal_code: @roaster.primary_address.postal_code,
        country: 'US',
        shipper_number: Rails.application.credentials[Rails.env.to_sym][:ups_account_number])
      rate_builder.add_ship_to(company_name: @customer.name,
        # phone_number: '0207 031 3000',
        address_line_1: @customer.primary_address.street_1,
        city: @customer.primary_address.city,
        state: @customer.primary_address.state,
        postal_code: @customer.primary_address.postal_code,
        country: 'US')
      rate_builder.add_package(weight: @order.weight,
        unit: 'LBS')
    end
  end
  
end