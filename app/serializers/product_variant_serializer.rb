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

class ProductVariantSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :quantity, :variant_title, :bag_size, :price_in_cents, :product_title

  def bag_size
    if self.object.custom_options["size"].present?
      return self.object.custom_options["size"]
    end
  end
end
