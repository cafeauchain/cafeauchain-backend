# == Schema Information
#
# Table name: product_variants
#
#  id                 :uuid             not null, primary key
#  quantity           :integer
#  variant_title      :string
#  custom_options     :jsonb
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  price_in_cents     :integer
#  product_id         :uuid
#  production_options :string           default("{}"), is an Array
#  inactive           :boolean          default("false")
#  sortorder          :integer
#  shipping_weight    :integer
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
