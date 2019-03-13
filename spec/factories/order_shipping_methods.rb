FactoryBot.define do
  factory :order_shipping_method do
    order { nil }
    shipping_method { nil }
    final_rate { 1 }
  end
end
