class CartSerializer < ActiveModel::Serializer
  attributes :id, :cart_items, :total_price, :total_line_items, :total_weight, :total_items

  def cart_items
    self.object.cart_items.map do |item|
      variant = item.product_variant
      product = variant.product
      {
        id: item.id,
        production_options: item.production_options,
        quantity: item.quantity,
        name: product.title,
        variant_id: item.product_variant_id,
        size: variant.custom_options["size"],
        price: '%.2f' % (variant.price_in_cents.to_i/100.0),
        image: product.product_image_urls[0],
        notes: item.notes
      }
    end
  end

  def total_price
    self.object.cart_items.sum { |ci| ci.product_variant.price_in_cents.to_f/100.0 * ci.quantity }
  end

  def total_line_items
    self.object.cart_items.length
  end

  def total_items
    self.object.cart_items.sum { |ci| ci.quantity }
  end

  def total_weight
    self.object.cart_items.sum { |ci| ci.product_variant.custom_options["size"].to_i * ci.quantity }
  end
end
