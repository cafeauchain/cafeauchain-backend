module OrderServices
  class CreateCartItem

    def self.create(cart_id, product_variant_id, quantity, options, notes)
      current_item = CartItem.find_by(product_variant_id: product_variant_id)
      if current_item
        how_to_update( true, current_item, product_variant_id, quantity, options, notes )
      else
        cart = Cart.find(cart_id)
        cart_item = CartItem.new(cart: cart, product_variant_id: product_variant_id, quantity: quantity, production_options: options, notes: notes )
        cart_item.save
        return cart_item
      end
    end

    def self.update(product_variant_id, quantity, options, notes)
      current_item = CartItem.find_by(product_variant_id: product_variant_id)
      how_to_update( false, current_item, product_variant_id, quantity, options, notes)
    end

    private

    def self.how_to_update(increment, current_item, product_variant_id, quantity, options, notes)
      current_qty = increment ? current_item.quantity : 0
      if(current_item.quantity != quantity.to_i || current_item.production_options != options || current_item.notes != notes)
        current_item.update(quantity: current_qty + quantity.to_i, production_options: options, notes: notes)
      end
    end

  end
end
