module InventoryServices
  class CreateProduct

    ###########################
    # Expected params shape:
    # {
    #   "name":"Awesome Coffee",
    #   "description": "Lorem ipsum",
    #   "composition":
    #     [{"inventory_item_id":"12","pct":"25"},{"inventory_item_id":"3","pct":"50"},{"inventory_item_id":"11","pct":"25"}],
    #   "variants":
    #     [{"size": "12oz", "bean_type": "whole_bean", price_in_dollars: "14.99"},{"size": "12oz", "bean_type": "ground", price_in_dollars: "15.00"},{"size": "5lb", "bean_type": "whole_bean", price_in_dollars: "60.99"}]
    # }
    # price_in_dollars gets converted to price_in_cents and that is how it is stored
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
        @composition_array.each do |component|
          ProductInventoryItem.create(inventory_item_id: component[:inventory_item_id], product: @product, percentage_of_product: component[:pct])
        end
        @variants.each do |variant|
          @variant = ProductVariant.new(product: @product, price_in_cents: (variant[:price_in_dollars].to_f * 100).to_i )
          @variant.custom_options = variant.except(:price_in_dollars, :id, :price_in_cents)
          @variant.save
        end
      end
      return @product
    end

  end
end
