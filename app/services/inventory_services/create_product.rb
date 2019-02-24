module InventoryServices
  class CreateProduct

    ###########################
    # Expected params shape:
    # {
    #   "name":"Awesome Coffee",
    #   "description": "Lorem ipsum",
    #   "product_images":
    #     [image_file, image_file]
    #   "composition":
    #     [{"inventory_item_id":"12","pct":"25"},{"inventory_item_id":"3","pct":"50"},{"inventory_item_id":"11","pct":"25"}],
    #   "variants":
    #     [{"size": "12oz", "bean_type": "whole_bean", price_in_cents: 1499},{"size": "12oz", "bean_type": "ground", price_in_cents: 1499},{"size": "5lb", "bean_type": "whole_bean", price_in_cents: 6099}]
    # }
    ############################

    def initialize(roaster_id, params)
      @product_params = params
      @composition_array = @product_params[:composition]
      @categories_array = @product_params[:categories]
      @variants = @product_params[:variants]
      @roaster = RoasterProfile.find(roaster_id)
    end

    def call
      @product = @roaster.products.new(title: @product_params[:name], description: @product_params[:description], status: @product_params[:status])
      @product.category_list = @categories_array
      if @product.save
        # @product.product_images.attach(@params[:product_images])
        @composition_array.each do |component|
          ProductInventoryItem.create(inventory_item_id: component[:inventory_item_id], product: @product, percentage_of_product: component[:pct])
        end
        @variants.each do |variant|
          @variant = ProductVariant.new(product: @product, price_in_cents: variant[:price_in_cents])
          @variant.custom_options = variant.except(:price_in_cents)
          @variant.save
        end
      end
      return @product
    end

  end
end