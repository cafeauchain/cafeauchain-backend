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
