# == Schema Information
#
# Table name: customer_profiles
#
#  id                 :bigint(8)        not null, primary key
#  company_name       :string
#  email              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  owner_id           :integer
#  stripe_customer_id :string
#
# Indexes
#
#  index_customer_profiles_on_owner_id  (owner_id)
#

class CustomerProfile < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  has_many :users
  has_many :addresses, as: :addressable, dependent: :destroy

  has_many :wholesale_profiles
  has_many :cards

  has_many :orders, through: :wholesale_profiles

  has_one_attached :logo

  def primary_address
    self.addresses.find_by(primary_location: true)
  end

  def logo_image_url
    if logo.nil?
      url_for(logo)
    end
  end

end
