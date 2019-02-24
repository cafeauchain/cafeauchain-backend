# == Schema Information
#
# Table name: products
#
#  id                 :bigint(8)        not null, primary key
#  description        :text
#  slug               :string
#  status             :integer
#  title              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_products_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

FactoryBot.define do
  factory :product do
    status { 1 }
    title { "MyString" }
    description { "MyText" }
    slug { "MyString" }
  end
end
