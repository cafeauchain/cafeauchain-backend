# == Schema Information
#
# Table name: plans
#
#  id             :bigint(8)        not null, primary key
#  interval       :string
#  name           :string
#  price_in_cents :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  stripe_plan_id :string
#

FactoryBot.define do
  factory :plan do
    stripe_plan_id { "MyString" }
    price_in_cents { 1 }
    interval { "MyString" }
    name { "MyString" }
  end
end
