class Api::V1::ProductsController < ApplicationController
  before_action :set_roaster, except: [:delete_image]
  before_action :set_product, only: [:update, :add_images, :show]

  def index
    @products = @roaster.products.sort_by(&:title)
    render json: @products, status: 200
  end

  def show
    render json: @product, status: 200
  end

  def create
    if params[:product_type] == 'hard_goods'
      @product = InventoryServices::CreateHardGood.new(@roaster.id, params).call
    else
      @product = InventoryServices::CreateProduct.new(@roaster.id, params).call
    end
    @product = InventoryServices::CreateProduct.new(@roaster.id, params).call
    if @product.errors.full_messages.empty?
      render json: @product, status: 200
    else
      render json: { data: @product.errors.full_messages }, status: 422
    end
  end

  def update
    @product = InventoryServices::UpdateProduct.call(@product.id, params)
    if @product.errors.full_messages.empty?
      render json: @product, status: 200
    else
      render json: { data: @product.errors.full_messages }, status: 422
    end
  end

  def variants
    @variants = []
    @roaster.products.each do |product|
      product.product_variants.select{ |pv| !pv.inactive? }.sort_by{ |pv| pv[:sortorder] }.each do |variant|
        @variants << variant
      end
    end
    render json: @variants, status: 200, each_serializer: ProductVariantSerializer
  end

  def add_images
    params[:product_images].each {|pi| ActiveStorageServices::ImageAttachment.new(pi, @product.id, "Product", "product_images").callAsFile('medium') }
  end

  def delete_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge
  end

  private

  def set_product
    begin
      @product = @roaster.products.find(params[:id])  
    rescue => exception
      return render json: { error: "Product not found", exception: exception, message: "Product not found" }, status: 404
    end
  end

  def set_roaster
    validate_roaster(RoasterProfile.friendly.find(params[:roaster_profile_id]))
  end
end
