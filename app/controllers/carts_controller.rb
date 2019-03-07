class CartsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cart = ActiveModel::SerializableResource.new(@cart, each_serializer: CartSerializer)
  end

end
