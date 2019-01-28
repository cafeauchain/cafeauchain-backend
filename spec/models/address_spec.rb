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

require 'rails_helper'

RSpec.describe Address, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
