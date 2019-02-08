# == Schema Information
#
# Table name: lots
#
#  id                 :bigint(8)        not null, primary key
#  contract_filled    :datetime
#  contract_open      :datetime
#  harvest_year       :string
#  pounds_of_coffee   :float
#  price_per_pound    :float
#  status             :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  crop_id            :bigint(8)
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_lots_on_crop_id             (crop_id)
#  index_lots_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

FactoryBot.define do
  factory :lot do
    number_of_bags 1
    bag_size "MyString"
    crop nil
    roaster_profile nil
    price_per_pound 1.5
  end
end
