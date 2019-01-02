class RoastController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def step_1
  end

  def step_2
  end

  def step_3
  end

  def load_lot
  end

  def new_lot
  end
  
  private

  def lot_params
    params.require(:lot).permit(:pounds_of_coffee, :price_per_pound)
  end
end