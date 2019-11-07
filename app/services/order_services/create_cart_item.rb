module OrderServices
  class CreateCartItem

    def self.create(cart_id, product_variant_id, quantity, options)
      cart = Cart.find(cart_id)
      isRoasted = options.length > 1
      current_item = cart.cart_items.find_by(product_variant_id: product_variant_id, production_options: isRoasted ? [options] : nil)
      if current_item
        how_to_update( true, current_item, quantity )
      else
        cart_item = CartItem.new(cart: cart, product_variant_id: product_variant_id, quantity: quantity, production_options: options )
        cart_item.save
        return cart_item
      end
    end

    def self.update(cart_item_id, quantity)
      current_item = CartItem.find(cart_item_id)
      how_to_update( false, current_item, quantity )
    end

    private

    def self.how_to_update(increment, current_item, quantity)
      current_qty = increment ? current_item.quantity : 0
      if(current_item.quantity != quantity.to_i)
        current_item.update(quantity: current_qty + quantity.to_i)
      end
      return current_item
    end

  end
end
