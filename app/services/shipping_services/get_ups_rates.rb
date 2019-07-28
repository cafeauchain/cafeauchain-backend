class ShippingServices::GetUpsRates

  def initialize(roaster, customer, order)
    @server = UPS::Connection.new
    @roaster = roaster
    @customer = customer
    @order = order
    @weight = order.total_weight
  end

  def rates
    response = @server.rates do |rate_builder|
      rate_builder.add_access_request(Rails.application.credentials[Rails.env.to_sym][:ups_api_key], 
        Rails.application.credentials[Rails.env.to_sym][:ups_username], 
        Rails.application.credentials[Rails.env.to_sym][:ups_password])
        # binding.pry
      rate_builder.add_shipper(company_name: @roaster.name,
        phone_number: '7064243964',
        attention_name: '',
        address_line_1: @roaster.primary_address.street_1,
        city: @roaster.primary_address.city,
        state: @roaster.primary_address.state,
        postal_code: @roaster.primary_address.postal_code,
        country: 'US',
        shipper_number: Rails.application.credentials[Rails.env.to_sym][:ups_account_number])
      rate_builder.add_ship_from(company_name: @roaster.name,
        phone_number: '7064243964',
        attention_name: '',
        address_line_1: @roaster.primary_address.street_1,
        city: @roaster.primary_address.city,
        state: @roaster.primary_address.state,
        postal_code: @roaster.primary_address.postal_code,
        country: 'US',
        shipper_number: Rails.application.credentials[Rails.env.to_sym][:ups_account_number])
      rate_builder.add_ship_to(company_name: @customer.company_name,
        phone_number: '7064243964',
        attention_name: '',
        address_line_1: @customer.primary_address.street_1,
        city: @customer.primary_address.city,
        state: @customer.primary_address.state,
        postal_code: @customer.primary_address.postal_code,
        country: 'US')
      (@weight / 150).times do
        rate_builder.add_package(weight: '150.0',
          unit: 'LBS')
      end
      if @weight % 150 > 0
        rate_builder.add_package(weight: (@weight % 150.0).to_s,
          unit: 'LBS')
      end
    end
  end
  
  # Returns:
  #  #<UPS::Parsers::RatesParser:0x00007fc2409c6828
  #  @current_rate={},
  #  @rated_shipments=
  #   [{:service_code=>"03",
  #     :service_name=>"Ground",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"87.68"},
  #    {:service_code=>"12",
  #     :service_name=>"3 Day Select",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"140.84"},
  #    {:service_code=>"59",
  #     :service_name=>"2nd Day Air A.M.",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"219.16"},
  #    {:service_code=>"02",
  #     :service_name=>"2nd Day Air",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"190.72"},
  #    {:service_code=>"13",
  #     :service_name=>"Next Day Air Saver",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"280.45"},
  #    {:service_code=>"14",
  #     :service_name=>"Next Day Air Early AM",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"337.00"},
  #    {:service_code=>"01",
  #     :service_name=>"Next Day Air",
  #     :warnings=>
  #      ["Additional Handling has automatically been set on Package 1.",
  #       "Additional Handling has automatically been set on Package 2.",
  #       "Additional Handling has automatically been set on Package 3.",
  #       "Additional Handling has automatically been set on Package 4.",
  #       "Your invoice may vary from the displayed reference rates"],
  #     :total=>"304.67"}],
  #  @status_code="1",
  #  @status_description="Success",
  #  @switches=
  #   {:RatingServiceSelectionResponse=>false,
  #    :Response=>false,
  #    :ResponseStatusCode=>false,
  #    :ResponseStatusDescription=>false,
  #    :RatedShipment=>false,
  #    :Service=>false,
  #    :Code=>false,
  #    :RatedShipmentWarning=>false,
  #    :BillingWeight=>false,
  #    :UnitOfMeasurement=>false,
  #    :Weight=>false,
  #    :TransportationCharges=>false,
  #    :CurrencyCode=>false,
  #    :MonetaryValue=>false,
  #    :ServiceOptionsCharges=>false,
  #    :TotalCharges=>false,
  #    :GuaranteedDaysToDelivery=>false,
  #    :ScheduledDeliveryTime=>false,
  #    :RatedPackage=>false}>
end