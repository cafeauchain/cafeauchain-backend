# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  roast_date           :date
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  easypost_shipment_id :string
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_orders_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

require 'rails_helper'

RSpec.describe Order, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
