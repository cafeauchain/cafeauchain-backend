# == Schema Information
#
# Table name: wholesale_profiles
#
#  id                  :bigint(8)        not null, primary key
#  onboard_status      :integer
#  shipping            :integer
#  tax_rate            :float
#  terms               :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  customer_profile_id :bigint(8)
#  roaster_profile_id  :bigint(8)
#
# Indexes
#
#  index_wholesale_profiles_on_customer_profile_id  (customer_profile_id)
#  index_wholesale_profiles_on_roaster_profile_id   (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_profile_id => customer_profiles.id)
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

require 'rails_helper'

RSpec.describe WholesaleProfile, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
