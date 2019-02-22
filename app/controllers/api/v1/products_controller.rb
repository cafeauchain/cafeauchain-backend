class Api::V1::ProductsController < ApplicationController
  before_action :set_roaster

  def index
    @products = Product.all
    render json: @products, status: 200
  end

  private

  def set_roaster
    @roaster = RoasterProfile.friendly.find(params[:roaster_profile_id])
  end
end
