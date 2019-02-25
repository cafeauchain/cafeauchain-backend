# == Schema Information
#
# Table name: carts
#
#  id                   :bigint(8)        not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_carts_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

FactoryBot.define do
  factory :cart do
    
  end
end
