# == Schema Information
#
# Table name: addresses
#
#  id               :bigint(8)        not null, primary key
#  city             :string
#  country          :string
#  latitude         :float
#  location_label   :string
#  longitude        :float
#  postal_code      :string
#  primary_location :boolean          default(FALSE)
#  state            :string
#  street_1         :string
#  street_2         :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  google_places_id :string
#

class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true
  
end
