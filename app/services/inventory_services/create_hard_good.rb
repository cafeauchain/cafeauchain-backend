module InventoryServices
  class CreateHardGood

    ###########################
    # Expected params shape:
    # {
    #   "name":"Sweet Tshirt",
    #   "description": "Lorem ipsum",
    #   "variants":
    #     [{"size": "XL", "price_in_dollars": "14.99"},{"size": "L", "price_in_dollars": "14.99"},{"size": "S", "price_in_dollars": "14.99"}],
    # }
    # price_in_dollars gets converted to price_in_cents and that is how it is stored
    ############################

    def initialize(roaster_id, params)
      @product_params = params
      @categories_array = @product_params[:categories]
      @variants = @product_params[:variants]
      @roaster = RoasterProfile.find(roaster_id)
    end

    def call
      @product = @roaster.products.new(
        title: @product_params[:name],
        description: @product_params[:description],
        status: @product_params[:status],
        product_type: @product_params[:product_type]
      )
      @product.category_list = @categories_array
      if @product.save
        @variants.each do |variant|
          InventoryServices::CreateVariant.call(@product, variant)
        end
      end
      return @product
    end

  end
end
