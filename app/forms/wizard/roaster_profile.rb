module Wizard
  module RoasterProfile
    STEPS = %w(step1 step2 step3 step4).freeze

    class Base
      include ActiveModel::Model
      attr_accessor :roaster_profile

      delegate *::RoasterProfile.attribute_names.map { |attr| [attr, "#{attr}="] }.flatten, to: :roaster_profile

      def initialize(roaster_profile_attributes)
        @roaster_profile = ::RoasterProfile.new(roaster_profile_attributes)
      end
    end

    class Step1 < Base
      validates :name, presence: true
      validates :about, presence: true
    end

    class Step2 < Step1
      validates :address_1, presence: true
      validates :zip_code, presence: true
      validates :city, presence: true
      validates :state, presence: true
    end

    class Step3 < Step2
      validates :url, presence: true
    end

    class Step4 < Step3
    end
  end
end