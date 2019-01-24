# == Route Map
#
#                                    Prefix Verb   URI Pattern                                                                              Controller#Action
# upload_csv_api_v1_admin_producer_profiles POST   /api/v1/admin/producers/upload_csv(.:format)                                             api/v1/admin/producer_profiles#upload_csv
#            api_v1_admin_producer_profiles GET    /api/v1/admin/producers(.:format)                                                        api/v1/admin/producer_profiles#index
#                                           POST   /api/v1/admin/producers(.:format)                                                        api/v1/admin/producer_profiles#create
#         new_api_v1_admin_producer_profile GET    /api/v1/admin/producers/new(.:format)                                                    api/v1/admin/producer_profiles#new
#        edit_api_v1_admin_producer_profile GET    /api/v1/admin/producers/:id/edit(.:format)                                               api/v1/admin/producer_profiles#edit
#             api_v1_admin_producer_profile GET    /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#show
#                                           PATCH  /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#update
#                                           PUT    /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#update
#                                           DELETE /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#destroy
#                      api_v1_subscriptions GET    /api/v1/subscriptions(.:format)                                                          api/v1/subscriptions#index
#                                           POST   /api/v1/subscriptions(.:format)                                                          api/v1/subscriptions#create
#                   new_api_v1_subscription GET    /api/v1/subscriptions/new(.:format)                                                      api/v1/subscriptions#new
#                  edit_api_v1_subscription GET    /api/v1/subscriptions/:id/edit(.:format)                                                 api/v1/subscriptions#edit
#                       api_v1_subscription GET    /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#show
#                                           PATCH  /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#update
#                                           PUT    /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#update
#                                           DELETE /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#destroy
#     validate_step_api_v1_roaster_profiles POST   /api/v1/roasters/validate_step(.:format)                                                 api/v1/roaster_profiles#validate_step
#              cards_api_v1_roaster_profile POST   /api/v1/roasters/:id/cards(.:format)                                                     api/v1/roaster_profiles#cards
#                                           DELETE /api/v1/roasters/:id/cards(.:format)                                                     api/v1/roaster_profiles#remove_card
#     set_as_default_api_v1_roaster_profile PUT    /api/v1/roasters/:id/set_as_default(.:format)                                            api/v1/roaster_profiles#set_as_default
#                   api_v1_roaster_profiles POST   /api/v1/roasters(.:format)                                                               api/v1/roaster_profiles#create
#                    api_v1_roaster_profile PATCH  /api/v1/roasters/:id(.:format)                                                           api/v1/roaster_profiles#update
#                                           PUT    /api/v1/roasters/:id(.:format)                                                           api/v1/roaster_profiles#update
#                               admin_plans GET    /admin/plans(.:format)                                                                   admin/plans#index
#                                           POST   /admin/plans(.:format)                                                                   admin/plans#create
#                            new_admin_plan GET    /admin/plans/new(.:format)                                                               admin/plans#new
#                           edit_admin_plan GET    /admin/plans/:id/edit(.:format)                                                          admin/plans#edit
#                                admin_plan GET    /admin/plans/:id(.:format)                                                               admin/plans#show
#                                           PATCH  /admin/plans/:id(.:format)                                                               admin/plans#update
#                                           PUT    /admin/plans/:id(.:format)                                                               admin/plans#update
#                                           DELETE /admin/plans/:id(.:format)                                                               admin/plans#destroy
#                   admin_producer_profiles GET    /admin/producers(.:format)                                                               admin/producer_profiles#index
#                                           POST   /admin/producers(.:format)                                                               admin/producer_profiles#create
#                new_admin_producer_profile GET    /admin/producers/new(.:format)                                                           admin/producer_profiles#new
#               edit_admin_producer_profile GET    /admin/producers/:id/edit(.:format)                                                      admin/producer_profiles#edit
#                    admin_producer_profile GET    /admin/producers/:id(.:format)                                                           admin/producer_profiles#show
#                                           PATCH  /admin/producers/:id(.:format)                                                           admin/producer_profiles#update
#                                           PUT    /admin/producers/:id(.:format)                                                           admin/producer_profiles#update
#                                           DELETE /admin/producers/:id(.:format)                                                           admin/producer_profiles#destroy
#                           admin_dashboard GET    /admin/dashboard(.:format)                                                               admin/dashboard#index
#       manage_subscription_roaster_profile GET    /roasters/:id/manage_subscription(.:format)                                              roaster_profiles#manage_subscription
#                               roast_index GET    /roasters/:id/roast(.:format)                                                            roast#index
#                          roaster_profiles GET    /roasters(.:format)                                                                      roaster_profiles#index
#                                           POST   /roasters(.:format)                                                                      roaster_profiles#create
#                       new_roaster_profile GET    /roasters/new(.:format)                                                                  roaster_profiles#new
#                      edit_roaster_profile GET    /roasters/:id/edit(.:format)                                                             roaster_profiles#edit
#                           roaster_profile GET    /roasters/:id(.:format)                                                                  roaster_profiles#show
#                                           PATCH  /roasters/:id(.:format)                                                                  roaster_profiles#update
#                                           PUT    /roasters/:id(.:format)                                                                  roaster_profiles#update
#                                           DELETE /roasters/:id(.:format)                                                                  roaster_profiles#destroy
#                    producer_profile_crops GET    /producers/:producer_profile_id/crops(.:format)                                          crops#index
#                                           POST   /producers/:producer_profile_id/crops(.:format)                                          crops#create
#                 new_producer_profile_crop GET    /producers/:producer_profile_id/crops/new(.:format)                                      crops#new
#                edit_producer_profile_crop GET    /producers/:producer_profile_id/crops/:id/edit(.:format)                                 crops#edit
#                     producer_profile_crop GET    /producers/:producer_profile_id/crops/:id(.:format)                                      crops#show
#                                           PATCH  /producers/:producer_profile_id/crops/:id(.:format)                                      crops#update
#                                           PUT    /producers/:producer_profile_id/crops/:id(.:format)                                      crops#update
#                                           DELETE /producers/:producer_profile_id/crops/:id(.:format)                                      crops#destroy
#                     producer_profile_lots GET    /producers/:producer_profile_id/lots(.:format)                                           lots#index
#                                           POST   /producers/:producer_profile_id/lots(.:format)                                           lots#create
#                  new_producer_profile_lot GET    /producers/:producer_profile_id/lots/new(.:format)                                       lots#new
#                 edit_producer_profile_lot GET    /producers/:producer_profile_id/lots/:id/edit(.:format)                                  lots#edit
#                      producer_profile_lot GET    /producers/:producer_profile_id/lots/:id(.:format)                                       lots#show
#                                           PATCH  /producers/:producer_profile_id/lots/:id(.:format)                                       lots#update
#                                           PUT    /producers/:producer_profile_id/lots/:id(.:format)                                       lots#update
#                                           DELETE /producers/:producer_profile_id/lots/:id(.:format)                                       lots#destroy
#                         producer_profiles GET    /producers(.:format)                                                                     producer_profiles#index
#                                           POST   /producers(.:format)                                                                     producer_profiles#create
#                      new_producer_profile GET    /producers/new(.:format)                                                                 producer_profiles#new
#                     edit_producer_profile GET    /producers/:id/edit(.:format)                                                            producer_profiles#edit
#                          producer_profile GET    /producers/:id(.:format)                                                                 producer_profiles#show
#                                           PATCH  /producers/:id(.:format)                                                                 producer_profiles#update
#                                           PUT    /producers/:id(.:format)                                                                 producer_profiles#update
#                                           DELETE /producers/:id(.:format)                                                                 producer_profiles#destroy
#                                 dashboard GET    /dashboard(.:format)                                                                     dashboard#index
#                          new_user_session GET    /users/sign_in(.:format)                                                                 users/sessions#new
#                              user_session POST   /users/sign_in(.:format)                                                                 users/sessions#create
#                      destroy_user_session DELETE /users/sign_out(.:format)                                                                users/sessions#destroy
#                         new_user_password GET    /users/password/new(.:format)                                                            devise/passwords#new
#                        edit_user_password GET    /users/password/edit(.:format)                                                           devise/passwords#edit
#                             user_password PATCH  /users/password(.:format)                                                                devise/passwords#update
#                                           PUT    /users/password(.:format)                                                                devise/passwords#update
#                                           POST   /users/password(.:format)                                                                devise/passwords#create
#                  cancel_user_registration GET    /users/cancel(.:format)                                                                  users/registrations#cancel
#                     new_user_registration GET    /users/sign_up(.:format)                                                                 users/registrations#new
#                    edit_user_registration GET    /users/edit(.:format)                                                                    users/registrations#edit
#                         user_registration PATCH  /users(.:format)                                                                         users/registrations#update
#                                           PUT    /users(.:format)                                                                         users/registrations#update
#                                           DELETE /users(.:format)                                                                         users/registrations#destroy
#                                           POST   /users(.:format)                                                                         users/registrations#create
#                                    logout GET    /logout(.:format)                                                                        devise/sessions#destroy
#                                      root GET    /                                                                                        high_voltage/pages#show {:id=>"home"}
#                                      home GET    /home(.:format)                                                                          redirect(301, /)
#                                           GET    /                                                                                        high_voltage/pages#show {:id=>"home"}
#                                      page GET    /*id                                                                                     high_voltage/pages#show
#                        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#                 rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#                        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#                 update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#                      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

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
      end
      resources :subscriptions
      resources :roaster_profiles, only: [:create, :update], path: "roasters" do
        collection do
          post :validate_step
        end
        member do
          post :cards
          delete :cards, to: "roaster_profiles#remove_card"
          put :set_as_default
        end
      end
    end
  end

  namespace :admin do
    resources :plans
    resources :producer_profiles, path: "producers"
    get 'dashboard', to: 'dashboard#index'
  end

  resources :roaster_profiles, path: "roasters" do
    member do
      get :manage_subscription
      resources :roast, only: [:index]
    end
  end

  resources :producer_profiles, path: "producers" do
    resources :crops
    resources :lots
  end

  get 'dashboard', to: 'dashboard#index'
  devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations" }

  devise_scope :user do
    get "/logout" => "devise/sessions#destroy"
  end

  root 'high_voltage/pages#show', id: 'home'

end
