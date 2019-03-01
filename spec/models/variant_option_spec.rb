# == Schema Information
#
# Table name: variant_options
#
#  id                 :bigint(8)        not null, primary key
#  options            :string           is an Array
#  title              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_variant_options_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

require 'rails_helper'

RSpec.describe VariantOption, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
