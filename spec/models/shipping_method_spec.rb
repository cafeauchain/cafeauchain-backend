# == Schema Information
#
# Table name: shipping_methods
#
#  id                    :bigint(8)        not null, primary key
#  carrier               :integer
#  easy_post_account_ref :string
#  flat_rate             :boolean          default(FALSE)
#  friendly_name         :string
#  rate                  :float
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  account_id            :string
#  roaster_profile_id    :bigint(8)
#
# Indexes
#
#  index_shipping_methods_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

require 'rails_helper'

RSpec.describe ShippingMethod, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
