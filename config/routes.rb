# == Route Map
#
# I, [2019-08-11T11:19:45.872973 #40531]  INFO -- sentry: ** [Raven] Raven 2.9.0 ready to catch errors

require 'high_voltage'

Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :producer_profiles, path: "producers" do
          collection do
            post :upload_csv
          end
        end
        resources :roaster_profiles, path: "roasters" do
          put :reset_profile
          put :update_inventory_item_quantities
          put :delete_lot
        end
      end
      resources :subscriptions
      resources :producer_profiles, path: "producers" do
        resources :crops
      end
      delete 'delete_image/:id', to: 'products#delete_image'
      resources :roaster_profiles, only: [:create, :update], path: "roasters" do
        collection do
          post :validate_step
        end
        put :update_logo
        get :lots_by_date, to: 'lots#lots_by_date'
        get :earliest_batch, to: 'lots#earliest'
        put :update_onboard_status
        put :update_wholesale_status
        resources :lots do
          collection do
            post :upload_lot_csv
          end
        end
        get :crops, to: 'roaster_profiles#crops'
        post :wholesale_signup, to: 'roaster_profiles#wholesale_signup'
        resources :batches, :transactions, :inventory_items
        resources :products do
          member do
            post :add_images
          end
        end
        get :variants, to: 'products#variants'
        resources :default_options, only: [:index, :create, :update]
        get :subscriptions
        post :cards
        delete :cards, to: "roaster_profiles#remove_card"
        put :set_as_default
        resources :shipping_methods, only: [:index, :create, :update]
        resources :cutoffs, only: [:index, :update]
      end
      get :get_rates, to: "shipping_methods#get_rates"
      resources :carts
      resources :orders
      put :order_items, to: "orders#update_order_items"
      resources :customers do
        post :update_address
        post :cards
        put :set_as_default
        delete :remove_card
        put :update_onboard_status
        put :set_shipping_default
        member do
          post :add_logo
        end
      end
      post :password_reset, to: "password#password_reset"
      resources :invoices, only: [:update]
    end
  end

  namespace :admin do
    resources :plans
    resources :producer_profiles, path: "producers"
    get 'dashboard', to: 'dashboard#index'
    get 'reset_user', to: 'dashboard#reset_user'
  end

  resources :roaster_profiles, path: "roasters", only: [:index, :new, :show, :edit]

  namespace :manage do
    get "dashboard", to: "primary#dashboard"
    get "inventory", to: "primary#inventory"
    resources :orders, only: [:show, :index, :new]
    resources :customers, only: [:show, :index]
    get "wholesale", to: "primary#wholesale"
    get "subscription", to: "primary#subscription"
    resources :lots, only: [:show, :index]
    resources :products, only: [:index]
    resources :production, only: [:index]
  end

  namespace :onboarding do
    get "profile", to: "onboarding#profile"
    get "lots", to: "onboarding#lots"
    get "roast_profiles", to: "onboarding#roast_profiles"
    get "wholesale_details", to: "onboarding#wholesale_details"
    get "wholesale_signup", to: "onboarding#wholesale_signup"
    get "shipping", to: "onboarding#shipping"
    get "products", to: "onboarding#products"
  end

  resources :producer_profiles, path: "producers" do
    resources :crops
    resources :lots
  end

  get 'dashboard', to: 'dashboard#index'
  devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations", passwords: "users/passwords" }

  devise_scope :user do
    get "/logout" => "users/sessions#destroy"
    get "/login" => "devise/sessions#create"
    get "/signup" => "devise/registrations#new"
    get "/register" => "devise/registrations#new"
  end

  constraints(ValidSubdomain) do
    # Customer 'View' Routes
    get 'cart', to: 'carts#index'
    namespace :shop do
      get "handletoken", to: "token#handletoken"
      resources :profile, only: [:index]
      get "profile/payment", to: "profile#payment"
      get "profile/addresses", to: "profile#addresses"
      resources :orders, only: [:index, :show]

      # Customer Onboarding Routes
      get "onboard/profile", to: "onboard#profile"
      get "onboard/addresses", to: "onboard#addresses"
      get "onboard/payment", to: "onboard#payment"
      get "onboard/shipping", to: "onboard#shipping"
      get "onboard/onboard_completed", to: "onboard#onboard_completed"
    end
    root 'shop/shop#index'
  end

  constraints(!ValidSubdomain) do
    root 'high_voltage/pages#show', id: 'home'
  end
end
