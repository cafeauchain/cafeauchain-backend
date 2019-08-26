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
  has_many :addresses, -> { order 'addresses.primary_location DESC, addresses.created_at' }, as: :addressable, dependent: :destroy

  has_many :wholesale_profiles
  has_many :cards

  has_many :orders, through: :wholesale_profiles

  has_one_attached :logo

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 

  def primary_address
    self.addresses.find_by(primary_location: true)
  end

  def logo_url
    if logo.attached?
      Rails.application.routes.url_helpers.rails_blob_path(logo, only_path: true)
    end
  end

end
