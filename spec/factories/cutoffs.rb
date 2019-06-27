# == Schema Information
#
# Table name: cutoffs
#
#  id                 :bigint(8)        not null, primary key
#  day_0              :time
#  day_1              :time
#  day_2              :time
#  day_3              :time
#  day_4              :time
#  day_5              :time
#  day_6              :time
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_cutoffs_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

FactoryBot.define do
  factory :cutoff do
    
  end
end
