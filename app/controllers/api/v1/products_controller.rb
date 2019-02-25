class Api::V1::ProductsController < ApplicationController
  before_action :set_roaster
  before_action :set_product, only: [:update]

  def index
    @products = Product.all
    render json: @products, status: 200
  end

  def create
    @product = InventoryServices::CreateProduct.new(@roaster.id, params).call
    if @product.errors.full_messages.empty?
      render json: {"redirect":false, data: @product}, status: 200
    else
      render json: { data: @product.errors.full_messages }, status: 422
    end
  end

  def update
    @product = InventoryServices::UpdateProduct.call(@product.id, params)
    if @product.errors.full_messages.empty?
      render json: {"redirect":false, data: @product}, status: 200
    else
      render json: { data: @product.errors.full_messages }, status: 422
    end
  end

  def variants
    @variants = ProductVariant.all
    render json: @variants, status: 200
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def set_roaster
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end
end