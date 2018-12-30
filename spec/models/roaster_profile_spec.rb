# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  about      :text
#  address_1  :string
#  city       :string
#  facebook   :string
#  location   :string
#  name       :string
#  slug       :string
#  state      :string
#  twitter    :string
#  url        :string
#  zip_code   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe RoasterProfile, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
