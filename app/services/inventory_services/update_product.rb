module InventoryServices
  class UpdateProduct

    def self.call(product_id, params)
      @product = Product.find(product_id)
      product_changed = @product.compare_composition(params[:composition])
      if product_changed
        @product.product_inventory_items.each{ |pii| pii.update(inactive: true)}
        params[:composition].each do |comp|
          ProductInventoryItem.create(product: @product, inventory_item_id: comp[:inventory_item_id], percentage_of_product: comp[:pct])
        end
      end
      variants_changed = @product.compare_variants(params[:variants])
      if variants_changed
        params[:variants].each do |variant|
          # TODO Decide how to handle deletes and additions
          @product.product_variants.find(variant[:id]).update(
            price_in_cents: variant[:price_in_dollars].to_f * 100, 
            custom_options: {"size": variant[:size]}
          )
        end
      end
      @product.update(title: params[:name], description: params[:description], status: params[:status])
      return @product
    end
  end
end