# == Schema Information
#
# Table name: crops
#
#  id                  :bigint(8)        not null, primary key
#  altitude            :string
#  country             :string
#  harvest_season      :string
#  name                :string
#  process             :string
#  region              :string
#  varietal            :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  producer_profile_id :bigint(8)
#
# Indexes
#
#  index_crops_on_producer_profile_id  (producer_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (producer_profile_id => producer_profiles.id)
#

FactoryBot.define do
  factory :crop do
    producer_profile nil
    crop_year "MyString"
    zone "MyString"
    varietal "MyString"
    bags 1
    bag_size "MyString"
  end
end
