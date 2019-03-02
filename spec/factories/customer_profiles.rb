# == Schema Information
#
# Table name: customer_profiles
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#

FactoryBot.define do
  factory :customer_profile do
    owner_id { 1 }
  end
end
