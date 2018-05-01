# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  facebook   :string
#  location   :string
#  name       :string
#  slug       :string
#  twitter    :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RoasterProfile < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  has_many :users
end
