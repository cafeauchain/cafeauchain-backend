# == Schema Information
#
# Table name: crops
#
#  id                  :bigint(8)        not null, primary key
#  bag_size            :string
#  bags                :integer
#  crop_year           :string
#  name                :string
#  varietal            :string
#  zone                :string
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

require 'rails_helper'

RSpec.describe Crop, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
