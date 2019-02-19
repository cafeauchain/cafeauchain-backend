# == Schema Information
#
# Table name: product_variants
#
#  id             :bigint(8)        not null, primary key
#  custom_options :jsonb
#  quantity       :integer
#  variant_title  :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  product_id     :bigint(8)
#
# Indexes
#
#  index_product_variants_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#

FactoryBot.define do
  factory :product_variant do
    product { nil }
    quantity { 1 }
    variant_title { "MyString" }
    custom_options { "" }
  end
end
