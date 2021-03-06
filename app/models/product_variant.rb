# == Schema Information
#
# Table name: product_variants
#
#  id                 :uuid             not null, primary key
#  custom_options     :jsonb
#  inactive           :boolean          default(FALSE)
#  price_in_cents     :integer
#  production_options :string           default([]), is an Array
#  quantity           :integer
#  sortorder          :integer
#  variant_title      :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  product_id         :uuid
#
# Indexes
#
#  index_product_variants_on_created_at  (created_at)
#  index_product_variants_on_product_id  (product_id)
#

class ProductVariant < ApplicationRecord
  belongs_to :product
  has_many :order_items

  def product_title
    product.present? ? product.title : "Cant find it"
  end

end
