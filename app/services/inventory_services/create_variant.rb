module InventoryServices
  class CreateVariant

    def self.call(product, variant)
        @pv = ProductVariant.new(
            product: product, 
            price_in_cents: (variant[:price_in_dollars].to_f * 100).to_i, 
            sortorder: variant[:sortorder],
            shipping_weight: product[:product_type] == "hard_goods" ? variant[:shipping_weight].to_i : variant[:size]
        )
        @pv.custom_options = variant.except(:price_in_dollars, :id, :price_in_cents, :sortorder, :shipping_weight)
        @pv.save
    end

  end
end
