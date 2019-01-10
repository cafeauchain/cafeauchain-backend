# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  about      :text
#  address_1  :string
#  address_2  :string
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
#  owner_id   :integer
#

FactoryBot.define do
  factory :roaster_profile do
    name "MyString"
    location "MyString"
    slug "MyString"
    url "MyString"
    twitter "MyString"
    facebook "MyString"
  end
end
