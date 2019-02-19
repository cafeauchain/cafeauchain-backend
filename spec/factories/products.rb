# == Schema Information
#
# Table name: products
#
#  id          :bigint(8)        not null, primary key
#  description :text
#  slug        :string
#  status      :integer
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryBot.define do
  factory :product do
    status { 1 }
    title { "MyString" }
    description { "MyText" }
    slug { "MyString" }
  end
end
