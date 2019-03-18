require 'stripe'

module StripeServices
  class CreateConnectAccount

    #################################
    # The difference between owner and account opener is legal ownership - must have at least the owner to accept payments
    #
    # Params: {
    #   tax_id: 00-0000000,
    #   phone: "706-555-1212",
    #   owner: {
    #     first_name: "",
    #     last_name: "",
    #     dob: {
    #       day: "",
    #       month: "",
    #       year: ""
    #     }
    #     address: {
    #       street_1: "",
    #       street_2: "",
    #       city: "",
    #       state: "",
    #       postal_code: ""
    #     },
    #     title: "",
    #     percent_ownership: "",
    #     ssn_last_4: 1234
    #   }
    #   account_opener: {
    #     first_name: "",
    #     last_name: "",
    #     dob: {
    #       day: "",
    #       month: "",
    #       year: ""
    #     }
    #     address: {
    #       street_1: "",
    #       street_2: "",
    #       city: "",
    #       state: "",
    #       postal_code: ""
    #     },
    #     title: "",
    #     percent_ownership: "",
    #     ssn_last_4: 1234
    #   }
    # }
    ################################################

    def self.account_create(roaster_profile_id, params)
      Stripe.api_key = Rails.application.credentials.stripe_secret_key
      @roaster_profile = RoasterProfile.find(roaster_profile_id)

      business_profile = {
        mcc: 5812, # Merchant code for restaurant/bar - best guess for coffee roasters
        name: @roaster_profile.name,
        support_email: @roaster_profile.owner.email,
        support_url: @roaster_profile.url
      }
      company = {
        name: @roaster_profile.name,
        tax_id: params[:tax_id],
        phone: params[:phone],
        address: {
          line1: @roaster_profile.primary_address.street_1,
          line2: @roaster_profile.primary_address.street_2,
          city: @roaster_profile.primary_address.city,
          state: @roaster_profile.primary_address.state,
          postal_code: @roaster_profile.primary_address.postal_code
        }
      }
      # first_name, last_name = @roaster_profile.owner.name.split(' ')
      owner = {
        first_name: params[:owner][:first_name],
        last_name: params[:owner][:last_name],
        email: params[:owner][:email],
        ssn_last_4: params[:owner][:ssn_last_4]
        dob: {
          day: params[:owner][:dob_day],
          month: params[:owner][:dob_month],
          year: params[:owner][:dob_year]
        },
        address: {
          line1: params[:owner][:street_1],
          line2: params[:owner][:street_2],
          city: params[:owner][:city],
          state: params[:owner][:state],
          postal_code: params[:owner][:postal_code],
          country: 'US'
        },
        relationship: {
          owner: true,
          percent_ownership: params[:owner][:percent_ownership],
          title: params[:owner][:title]
        }
      }
      # ao_first_name, ao_last_name = params[:account_opener][:name].split(' ')
      account_opener = {
        first_name: params[:account_opener][:first_name],
        last_name: params[:account_opener][:last_name],
        email: params[:account_opener][:email],
        dob: {day: params[:account_opener][:dob_day], month: params[:account_opener][:dob_month], year: params[:account_opener][:dob_year]},
        address: {
          line1: params[:account_opener][:street_1],
          line2: params[:account_opener][:street_2],
          city: params[:account_opener][:city],
          state: params[:account_opener][:state],
          postal_code: params[:account_opener][:postal_code],
          country: 'US'
        },
        relationship: {
          account_opener: true,
          title: params[:account_opener][:title]
        }

      }

      account = Stripe::Account.create({
        country: 'US',
        type: 'custom',
        requested_capabilities: ['card_payments'],
        business_type: 'company',
        email: @roaster_profile.owner.email,
        business_profile: business_profile,
        company: company,
        relationship: {account_opener: account_opener, owner: owner},
        tos_acceptance: {date: Time.now.to_i, ip: @roaster_profile.owner.last_sign_in_ip}
      })
      stripe_owner = Stripe::Account.create_person(
        account.id,
        owner
      )
      @roaster_profile.update(stripe_account_id: account.id)
    end

  end
end
