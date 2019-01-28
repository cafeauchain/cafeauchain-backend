# == Schema Information
#
# Table name: addresses
#
#  id               :bigint(8)        not null, primary key
#  addressable_type :string
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
#  addressable_id   :bigint(8)
#  google_places_id :string
#
# Indexes
#
#  index_addresses_on_addressable_type_and_addressable_id  (addressable_type,addressable_id)
#

FactoryBot.define do
  factory :address do
    latitude { 1.5 }
    longitude { 1.5 }
    google_places_id { "MyString" }
    location_label { "MyString" }
    street_1 { "MyString" }
    street_2 { "MyString" }
    city { "MyString" }
    state { "MyString" }
    country { "MyString" }
    postal_code { "MyString" }
    primary_location { false }
  end
end
