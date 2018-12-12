class Admin::PlansController < ApplicationController
  before_action :set_plan, only: [:edit, :update, :show, :destroy]

  def index
    @plans = Plan.all
  end

  def show
  end

  def new
    @plan = Plan.new
  end

  def create
    @plan = Plan.new(plan_params)
    if @plan.save!
      redirect_to admin_plan_path(@plan), notice: 'Plan successfully created!'
    else
      render :new, alert: "Something went wrong: #{@plan.errors.full_messages}"
    end
  end

  def edit
  end

  def update
    if @plan.update!(plan_params)
      redirect_to admin_plan_path(@plan), notice: 'Plan successfully created!'
    else
      render :edit, alert: "Something went wrong: #{@plan.errors.full_messages}"
    end
  end
  
  def destroy
  end
  
  private

  def set_plan
    @plan = Plan.find(params[:id])
  end

  def plan_params
    params.require(:plan).permit(:name, :interval, :stripe_plan_id, :price_in_cents)
  end
  
end