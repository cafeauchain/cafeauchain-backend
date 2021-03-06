# == Schema Information
#
# Table name: lots
#
#  id                 :uuid             not null, primary key
#  contract_filled    :datetime
#  contract_open      :datetime
#  harvest_year       :string
#  label              :string
#  low_on_hand        :integer
#  low_remaining      :integer
#  name               :string
#  on_hand_alert      :boolean          default(FALSE)
#  origin             :string
#  pounds_of_coffee   :float
#  price_per_pound    :float
#  roasted_on_import  :integer
#  status             :integer
#  warehouse_alert    :boolean          default(FALSE)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  crop_id            :bigint(8)
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_lots_on_created_at          (created_at)
#  index_lots_on_crop_id             (crop_id)
#  index_lots_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

require 'rails_helper'

RSpec.describe Lot, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
