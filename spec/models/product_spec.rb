# == Schema Information
#
# Table name: products
#
#  id                 :uuid             not null, primary key
#  description        :text
#  product_options    :jsonb
#  slug               :string
#  status             :integer
#  title              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_products_on_created_at          (created_at)
#  index_products_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

require 'rails_helper'

RSpec.describe Product, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
