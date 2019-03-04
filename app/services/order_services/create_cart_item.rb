module OrderServices
  class CreateCartItem

    def self.create(cart_id, product_variant_id, quantity, production_options, notes)
      @cart = Cart.find(cart_id)
      @cart_item = CartItem.new(cart: @cart, product_variant_id: product_variant_id, quantity: quantity, production_options: production_options, notes: notes )
      @cart_item.save
      return @cart_item
    end
  end
end
