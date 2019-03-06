# == Schema Information
#
# Table name: customer_profiles
#
#  id                 :bigint(8)        not null, primary key
#  company_name       :string
#  email              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  owner_id           :integer
#  stripe_customer_id :string
#
# Indexes
#
#  index_customer_profiles_on_owner_id  (owner_id)
#
# Indexes
#
#  index_customer_profiles_on_owner_id  (owner_id)
#

FactoryBot.define do
  factory :customer_profile do
    owner_id { 1 }
  end
end
