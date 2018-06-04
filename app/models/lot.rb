# == Schema Information
#
# Table name: lots
#
#  id                 :bigint(8)        not null, primary key
#  bag_size           :string
#  number_of_bags     :integer
#  price_per_pound    :float
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

class Lot < ApplicationRecord
  belongs_to :crop
  belongs_to :roaster_profile
end
