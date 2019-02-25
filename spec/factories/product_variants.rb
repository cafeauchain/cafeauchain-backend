# == Schema Information
#
# Table name: product_variants
#
#  id             :uuid             not null, primary key
#  custom_options :jsonb
#  price_in_cents :integer
#  quantity       :integer
#  variant_title  :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  product_id     :uuid
#
# Indexes
#
#  index_product_variants_on_created_at  (created_at)
#  index_product_variants_on_product_id  (product_id)
#

FactoryBot.define do
  factory :product_variant do
    product { nil }
    quantity { 1 }
    variant_title { "MyString" }
    custom_options { "" }
  end
end
