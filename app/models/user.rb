# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  admin                  :boolean
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  name                   :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  slug                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  customer_profile_id    :bigint(8)
#  roaster_profile_id     :bigint(8)
#
# Indexes
#
#  index_users_on_customer_profile_id   (customer_profile_id)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_roaster_profile_id    (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_profile_id => customer_profiles.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :roaster_profile, optional: true
  belongs_to :customer_profile, optional: true
  has_one :subscription
  has_many :cards, through: :subscription

  validates_confirmation_of :password

  def is_owner
    roaster_profile.owner == self
  end

  def cart(roaster)
    if !customer_profile.nil?
      customer_profile.wholesale_profiles.find_by(roaster_profile: roaster).cart
    end
  end
end
