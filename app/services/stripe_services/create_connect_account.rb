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

    def self.account_create_business(roaster_profile_id, params)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      @roaster_profile = RoasterProfile.find(roaster_profile_id)

      business_profile = {
        mcc: 5812, # Merchant code for restaurant/bar - best guess for coffee roasters
        name: params[:business][:name],
        support_email: params[:business][:email],
        support_url: params[:business][:support_url],
        url: params[:business][:url]
      }
      company = {
        name: params[:business][:name],
        tax_id: params[:business][:tax_id],
        phone: params[:business][:phone],
        address: {
          line1: params[:business][:address][:street_1],
          line2: params[:business][:address][:street_2],
          city: params[:business][:address][:city],
          state: params[:business][:address][:state],
          postal_code: params[:business][:address][:postal_code]
        }
      }


      external_account = {
        object: 'bank_account',
        country: 'US',
        currency: 'usd',
        account_holder_type: 'company',
        routing_number: params[:business][:routing],
        account_number: params[:business][:account]
      }

      account = {
        country: 'US',
        type: 'custom',
        requested_capabilities: ['card_payments'],
        business_type: 'company',
        email: params[:business][:email],
        business_profile: business_profile,
        company: company,
        external_account: external_account,
        # relationship: {account_opener: account_opener, owner: owner},
        tos_acceptance: {date: Time.now.to_i, ip: @roaster_profile.owner.last_sign_in_ip}
      }

      stripe_account = Stripe::Account.create(account)

      token = Stripe::Token.create(
        {
          bank_account: {
            country: 'US',
            currency: 'usd',
            account_holder_name: @roaster_profile.name,
            account_holder_type: 'company',
            routing_number: params[:business][:routing],
            account_number: params[:business][:account],
          }
        }
      )
      Stripe::Customer.create_source(@roaster_profile.owner.subscription.stripe_customer_id, {source: token})

      return stripe_account
    end

    def self.account_create_owner(roaster_profile_id, params)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      @roaster_profile = RoasterProfile.find(roaster_profile_id)

      owner = {
        first_name: params[:owner][:first_name],
        last_name: params[:owner][:last_name],
        email: params[:owner][:email],
        ssn_last_4: params[:owner][:ssn_last_4],
        phone: params[:owner][:phone],
        dob: {
          day: params[:owner][:dob][:dob_day],
          month: params[:owner][:dob][:dob_month],
          year: params[:owner][:dob][:dob_year]
        },
        address: {
          line1: params[:owner][:address][:street_1],
          line2: params[:owner][:address][:street_2],
          city: params[:owner][:address][:city],
          state: params[:owner][:address][:state],
          postal_code: params[:owner][:address][:postal_code],
          country: 'US'
        },
        relationship: {
          owner: true,
          title: params[:owner][:title]
        },
        verification: {
          document: {
            front: self.verifyPerson(params[:owner_verification_front]),
            back: self.verifyPerson(params[:owner_verification_back])
          }
        }
      }

      stripe_owner = Stripe::Account.create_person(
        @roaster_profile[:stripe_account_id],
        owner
      )

      return stripe_owner

    end

    def self.account_create_opener(roaster_profile_id, params)
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      @roaster_profile = RoasterProfile.find(roaster_profile_id)

      account_opener = {
        first_name: params[:account_opener][:first_name],
        last_name: params[:account_opener][:last_name],
        email: params[:account_opener][:email],
        ssn_last_4: params[:account_opener][:ssn_last_4],
        phone: params[:account_opener][:phone],
        dob: {
          day: params[:account_opener][:dob][:dob_day],
          month: params[:account_opener][:dob][:dob_month],
          year: params[:account_opener][:dob][:dob_year]
        },
        address: {
          line1: params[:account_opener][:address][:street_1],
          line2: params[:account_opener][:address][:street_2],
          city: params[:account_opener][:address][:city],
          state: params[:account_opener][:address][:state],
          postal_code: params[:account_opener][:address][:postal_code],
          country: 'US'
        },
        relationship: {
          account_opener: true,
          title: params[:account_opener][:title]
        },
        verification: {
          document: {
            front: self.verifyPerson(params[:opener_verification_front]),
            back: self.verifyPerson(params[:opener_verification_back])
          }
        }
      }

      if params[:account_opener][:isOwner] == "yes"
        account_opener[:relationship][:owner] = true
      end

      stripe_opener = Stripe::Account.create_person(
        @roaster_profile[:stripe_account_id],
        account_opener
      )

      return stripe_opener
    end

    def self.verifyPerson( file )
      if file.present?
        Stripe::File.create({
          purpose:'identity_document',
          file: file["0"]
        })
      end
    end

  end
end
