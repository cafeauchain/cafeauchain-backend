module Api::V1
  class RoasterProfilesController < ApplicationController
    before_action :load_roaster_profile_wizard, except: [:validate_step, :update]
  
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
      if @roaster_profile_wizard.roaster_profile.save!
        logo = (params[:roaster_profile][:logo])
        roaster_profile = @roaster_profile_wizard.roaster_profile
        roaster_profile.users << current_user
        roaster_profile.set_owner
        if !logo.blank?
          ActiveStorageServices::ImageAttachment.new(logo, roaster_profile.id, "RoasterProfile", "logo").call
        end
        session[:roaster_profile_attributes] = nil
        StripeServices::EnrollBaseSubscription.enroll
        render json: {"redirect":true,"redirect_url": roaster_profile_path(@roaster_profile_wizard.roaster_profile)}, status: 200
      else
        redirect_to new_roaster_profile_path, alert: 'There were a problem when creating the Roaster Profile.'
      end
    end

    def update
      @roaster_profile = RoasterProfile.find(params[:id])
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

    # Never trust parameters from the scary internet, only allow the white list through.
    def roaster_profile_params
      params.require(:roaster_profile).permit(:name, :address_1, :address_2, :zip_code, :city, :state, :about, :slug, :url, :twitter, :facebook)
    end
  
    class InvalidStep < StandardError; end

  end
end