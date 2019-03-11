# TODO Consider moving this under the Manage namespace
# Or at least update the url to be something like /manage/profile
class RoasterProfilesController < ApplicationController
  before_action :authenticate_user!, except: [:shop]
  before_action :set_roaster_profile, except: [:index, :new, :shop]

  def index
    @roaster_profiles = RoasterProfile.all
    render "manage/primary", locals: {
      profiles: @roaster_profiles,
      roaster: current_user.roaster_profile,
      title: 'Roasters',
      component: 'roaster_profile/profiles'
    }
  end

  def show
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      title: 'Roaster',
      component: 'roaster_profile/profile'
    }
  end

  def new
    @roaster_profile = RoasterProfile.new
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      title: 'New Roaster',
      component: 'roaster_profile_wizard/App'
    }
  end

  def edit
    render "manage/primary", locals: {
      roaster: @roaster_profile,
      title: 'Edit Profile',
      component: 'roaster_profile/edit'
    }
  end

  # PATCH/PUT /roaster_profiles/1
  # PATCH/PUT /roaster_profiles/1.json
  def update
  end

  # DELETE /roaster_profiles/1
  # DELETE /roaster_profiles/1.json
  def destroy
  end

  def dashboard

  end

  def manage_inventory
    # TODO This method can probably be deleted

  end


  def manage_subscription
    # TODO This method can probably be deleted
    subscription = Subscription.includes(:subscription_items).find_by(user: @roaster_profile.owner)
    @subscription = ActiveModel::SerializableResource.new(subscription)
    @cards = subscription.cards
  end

  def wholesale
    # TODO This method can probably be deleted
    @wholesale_profiles = @roaster_profile.wholesale_profiles
    @orders = @roaster_profile.orders
    @orders = ActiveModel::SerializableResource.new(@roaster_profile.orders, each_serializer: OrderSerializer)
  end

  def shop
    # TODO This method can probably be deleted
    @roaster_profile = @current_roaster || RoasterProfile.find_by(subdomain: request.subdomain)
    @products = ActiveModel::SerializableResource.new(@roaster_profile.products, each_serializer: ProductSerializer)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_roaster_profile
    @roaster_profile = current_user.roaster_profile
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def roaster_profile_params
    params.require(:roaster_profile).permit(:name, :address_1, :address_2, :zip_code, :city, :state, :about, :slug, :url, :twitter, :facebook)
  end
end
