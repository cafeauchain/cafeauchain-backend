class ProductVariantSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :quantity, :variant_title, :bag_size, :price_in_cents, :product_title

  def bag_size
    if self.object.custom_options["size"].present?
      return self.object.custom_options["size"]
    end
  end
end
