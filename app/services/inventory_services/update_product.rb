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

      variants_changed = @product.compare_variants(params[:variants], @product.product_variants)
      if !variants_changed[:added_variants].empty?
        variants_changed[:added_variants].each do |av|
          variant = params[:variants].detect {|v| v[:id] == av }
          InventoryServices::CreateVariant.call(@product, variant)
        end
      end

      if !variants_changed[:changed_variants].empty?
        variants_changed[:changed_variants].each do |cv|
          ProductVariant.find( cv ).update(inactive: true)
          variant = params[:variants].detect {|v| v[:id] == cv }
          InventoryServices::CreateVariant.call(@product, variant)
        end
      end

      if !variants_changed[:updated_variants].empty?
        variants_changed[:updated_variants].each do |cv|
          variant = params[:variants].detect {|v| v[:id] == cv }
          ProductVariant.find( cv ).update(sortorder: variant[:sortorder], shipping_weight: variant[:shipping_weight].to_i)
        end
      end

      if !variants_changed[:removed_variants].empty?
        variants_changed[:removed_variants].each do |dv|
          ProductVariant.find( dv ).update(inactive: true)
        end
      end
      
      @product.update(title: params[:name], description: params[:description], status: params[:status], product_options: params[:product_options])
      return @product
    end
  end
end