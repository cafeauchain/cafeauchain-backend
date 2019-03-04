class CartSerializer < ActiveModel::Serializer
  attributes :id, :cart_items

  def cart_items
    self.object.cart_items.map do |item|
      variant = ProductVariant.find(item.product_variant_id)
      product = Product.find(variant.product_id)
      {
        id: item.id,
        production_options: item.production_options,
        quantity: item.quantity,
        name: product.title,
        size: variant.custom_options["size"],
        price: '%.2f' % (variant.price_in_cents.to_i/100.0),
        image: product.product_image_urls[0],
        notes: item.notes
      }
    end
  end
end
