FactoryBot.define do
  factory :plan do
    stripe_plan_id { "MyString" }
    price_in_cents { 1 }
    interval { "MyString" }
    name { "MyString" }
  end
end
