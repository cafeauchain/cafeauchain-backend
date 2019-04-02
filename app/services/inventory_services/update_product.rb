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
      @product.update(title: params[:name], description: params[:description], status: params[:status])
      return @product
    end
  end
end