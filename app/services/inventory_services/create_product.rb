module InventoryService
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
    #     [{"size": "12oz", "bean_type": "whole_bean"},{"size": "12oz", "bean_type": "ground"},{"size": "5lb", "bean_type": "whole_bean"}]
    # }
    ############################
    
    def initialize(params)
      @product_params = params
      @composition_array = params[:composition]
      @categories_array = params[:categories]
      @variants = params[:variants]
    end

    def call
      @product = Product.new(title: @params[:name], description: @params[:description], status: @params[:status])
      @product.category_list = @categories_array
      if @product.save
        @product.product_images.attach(@params[:product_images])
        @composition_array.each do |component|
          ProductInventoryItem.create(inventory_item_id: component[:inventory_item_id], product: @product, percentage_of_product: component[:pct])
        end
        @variants.each do |variant|
          @variant = ProductVariant.create(product: @product, price: variant[:price])
          if !variant[:size].nil?
            @variant.update(custom_options: {size: variant[:size]})
          end
          if !variant[:bean_type].nil?
            @variant.update(custom_options: {bean_type: variant[:bean_type]})
          end
        end
      end
      return @product
    end

  end
end