module Api::V1
  class RoasterProfilesController < ApplicationController
    before_action :load_roaster_profile_wizard, except: [:validate_step, :update, :crops, :cards, :set_as_default, :remove_card, :subscriptions, :default_options, :wholesale_signup, :update_onboard_status, :update_wholesale_status]
    before_action :set_roaster, only: [:update, :crops, :cards, :set_as_default, :remove_card, :subscriptions, :default_options, :wholesale_signup, :update_onboard_status, :update_wholesale_status]

    def validate_step
      current_step = params[:current_step]
      @roaster_profile_wizard = wizard_roaster_profile_for_step(current_step)
      @roaster_profile_wizard.roaster_profile.attributes = roaster_profile_params
      session[:roaster_profile_attributes] = @roaster_profile_wizard.roaster_profile.attributes

      if @roaster_profile_wizard.valid?
        next_step = wizard_roaster_profile_next_step(current_step)
        create and return unless next_step

        render json: @roaster_profile_wizard.roaster_profile.attributes, status: 200
      else
        render json: @roaster_profile_wizard, status: 422
      end
    end

    def create
      @roaster_profile_wizard.roaster_profile.subdomain = @roaster_profile_wizard.roaster_profile.name
      if @roaster_profile_wizard.roaster_profile.save!
        logo = (params[:roaster_profile][:logo])
        roaster_profile = @roaster_profile_wizard.roaster_profile
        roaster_profile.addresses.create!(location_label: "Office", primary_location: true, street_1: params[:roaster_profile][:street_1], street_2: params[:roaster_profile][:street_2],
          city: params[:roaster_profile][:city], state: params[:roaster_profile][:state], postal_code: params[:roaster_profile][:postal_code], country: "United States of America")
        roaster_profile.users << current_user
        roaster_profile.set_owner
        if !logo.blank?
          ActiveStorageServices::ImageAttachment.new(logo, roaster_profile.id, "RoasterProfile", "logo").call
        end
        session[:roaster_profile_attributes] = nil
        StripeServices::EnrollBaseSubscription.initial_enroll(current_user.id)
        roaster_profile.update(onboard_status: 'lots')
        render json: {"redirect":true,"redirect_url": onboarding_lots_path()}, status: 200
      else
        redirect_to new_roaster_profile_path, alert: 'There were a problem when creating the Roaster Profile.'
      end
    end

    def update
      if current_user == @roaster_profile.owner
        if @roaster_profile.update(roaster_profile_params)
          logo = (params[:roaster_profile][:logo])
          if !logo.blank?
            ActiveStorageServices::ImageAttachment.new(logo, @roaster_profile.id, "RoasterProfile", "logo").call
          end
          render json: @roaster_profile, status: 200
        else
          render json: @roaster_profile.errors, status: 422
        end
      end
    end

    def crops
      @crops = @roaster_profile.crops.includes(:lots)
      render json: @crops.includes(:lots), status: 200
    end

    def subscriptions
      @subscription = @roaster_profile.owner.subscription
      render json: @subscription, status: 200
    end

    def cards
      begin
        StripeServices::CreateCard.call(@roaster_profile.subscription.id, nil, params[:token], params[:setAsDefault])
        render json: @roaster_profile.subscription.cards, status: 200
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def set_as_default
      @card = Card.find(params[:card_id])
      if @roaster_profile.subscription.default_card.update(default: false)
        @card.update(default: true)
        StripeServices::UpdateDefaultCard.call(@roaster_profile.subscription.id, nil, @card.stripe_card_id)
        render json: @roaster_profile.subscription.cards, status: 200
      else
        render json: @card.errors, status: 422
      end
    end

    def remove_card
      @card = Card.find(params[:card_id])
      if @roaster_profile.subscription.default_card != @card
        StripeServices::RemoveCard.call(@roaster_profile.subscription.id, nil, @card.stripe_card_id)
        @card.destroy
        render json: @roaster_profile.subscription.cards, status: 200
      else
        @card.errors.add(:base, "Cannot remove default card; please set another card as default first.")
        puts @card.errors.full_messages
        render json: @card.errors, status: 422
      end
    end

    # def default_options
    #   @options = VariantOption.where(roaster_profile_id: @roaster_profile.id )
    #   render json: @options, status: 200
    # end

    def wholesale_signup
      begin
        StripeServices::CreateConnectAccount.account_create(@roaster_profile.id, params)
        @roaster_profile.update(onboard_status: "shipping")
        render json: { redirect: true, redirect_url: onboarding_shipping_path }, status: 200
      rescue StandardError => e
        render json: {
            error: e.http_status,
            message: e.message,
            code: e.code
        }, status: e.http_status
      end
    end

    def update_onboard_status
      if params[:status] == 'onboard_completed'
        url = "/manage/dashboard"
        @roaster_profile.update(onboard_status: params[:status], wholesale_status: 'enrolled')
      else
        url = "/onboarding/" + params[:status]
        @roaster_profile.update(onboard_status: params[:status])
      end
      render json: { redirect: true, redirect_url: url }, status: 200
    end

    def update_wholesale_status
      @roaster_profile.update(onboard_status: params[:status], wholesale_status: 'not_enrolled')
      render json: { redirect: true, redirect_url: "/manage/dashboard" }, status: 200
    end

    private

    def load_roaster_profile_wizard
      if action_name == "new"
        @roaster_profile_wizard = wizard_roaster_profile_for_step("step1")
      else
        @roaster_profile_wizard = wizard_roaster_profile_for_step(action_name)
      end
    end

    def wizard_roaster_profile_next_step(step)
      Wizard::RoasterProfile::STEPS[Wizard::RoasterProfile::STEPS.index(step) + 1]
    end

    def wizard_roaster_profile_for_step(step)
      raise InvalidStep unless step.in?(Wizard::RoasterProfile::STEPS)

      "Wizard::RoasterProfile::#{step.camelize}".constantize.new(session[:roaster_profile_attributes])
    end

    def set_roaster
      @roaster_profile = RoasterProfile.friendly.find(params[:roaster_profile_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def roaster_profile_params
      params.require(:roaster_profile).permit(:name, :address_1, :address_2, :zip_code, :city, :state, :about, :slug, :url, :twitter, :facebook)
    end

    class InvalidStep < StandardError; end

  end
end
