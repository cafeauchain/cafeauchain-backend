# == Route Map
#
#                     Prefix Verb   URI Pattern                                              Controller#Action
#                admin_plans GET    /admin/plans(.:format)                                   admin/plans#index
#                            POST   /admin/plans(.:format)                                   admin/plans#create
#             new_admin_plan GET    /admin/plans/new(.:format)                               admin/plans#new
#            edit_admin_plan GET    /admin/plans/:id/edit(.:format)                          admin/plans#edit
#                 admin_plan GET    /admin/plans/:id(.:format)                               admin/plans#show
#                            PATCH  /admin/plans/:id(.:format)                               admin/plans#update
#                            PUT    /admin/plans/:id(.:format)                               admin/plans#update
#                            DELETE /admin/plans/:id(.:format)                               admin/plans#destroy
#            admin_dashboard GET    /admin/dashboard(.:format)                               admin/dashboard#index
#           roaster_profiles GET    /roasters(.:format)                                      roaster_profiles#index
#                            POST   /roasters(.:format)                                      roaster_profiles#create
#        new_roaster_profile GET    /roasters/new(.:format)                                  roaster_profiles#new
#       edit_roaster_profile GET    /roasters/:id/edit(.:format)                             roaster_profiles#edit
#            roaster_profile GET    /roasters/:id(.:format)                                  roaster_profiles#show
#                            PATCH  /roasters/:id(.:format)                                  roaster_profiles#update
#                            PUT    /roasters/:id(.:format)                                  roaster_profiles#update
#                            DELETE /roasters/:id(.:format)                                  roaster_profiles#destroy
#     producer_profile_crops GET    /producers/:producer_profile_id/crops(.:format)          crops#index
#                            POST   /producers/:producer_profile_id/crops(.:format)          crops#create
#  new_producer_profile_crop GET    /producers/:producer_profile_id/crops/new(.:format)      crops#new
# edit_producer_profile_crop GET    /producers/:producer_profile_id/crops/:id/edit(.:format) crops#edit
#      producer_profile_crop GET    /producers/:producer_profile_id/crops/:id(.:format)      crops#show
#                            PATCH  /producers/:producer_profile_id/crops/:id(.:format)      crops#update
#                            PUT    /producers/:producer_profile_id/crops/:id(.:format)      crops#update
#                            DELETE /producers/:producer_profile_id/crops/:id(.:format)      crops#destroy
#      producer_profile_lots GET    /producers/:producer_profile_id/lots(.:format)           lots#index
#                            POST   /producers/:producer_profile_id/lots(.:format)           lots#create
#   new_producer_profile_lot GET    /producers/:producer_profile_id/lots/new(.:format)       lots#new
#  edit_producer_profile_lot GET    /producers/:producer_profile_id/lots/:id/edit(.:format)  lots#edit
#       producer_profile_lot GET    /producers/:producer_profile_id/lots/:id(.:format)       lots#show
#                            PATCH  /producers/:producer_profile_id/lots/:id(.:format)       lots#update
#                            PUT    /producers/:producer_profile_id/lots/:id(.:format)       lots#update
#                            DELETE /producers/:producer_profile_id/lots/:id(.:format)       lots#destroy
#          producer_profiles GET    /producers(.:format)                                     producer_profiles#index
#                            POST   /producers(.:format)                                     producer_profiles#create
#       new_producer_profile GET    /producers/new(.:format)                                 producer_profiles#new
#      edit_producer_profile GET    /producers/:id/edit(.:format)                            producer_profiles#edit
#           producer_profile GET    /producers/:id(.:format)                                 producer_profiles#show
#                            PATCH  /producers/:id(.:format)                                 producer_profiles#update
#                            PUT    /producers/:id(.:format)                                 producer_profiles#update
#                            DELETE /producers/:id(.:format)                                 producer_profiles#destroy
#                roast_index GET    /roast(.:format)                                         roast#index
#                            GET    /roast/step_1/:id(.:format)                              roast#step_1
#               roast_step_2 POST   /roast/step_2(.:format)                                  roast#step_2
#               roast_step_3 POST   /roast/step_3(.:format)                                  roast#step_3
#                            GET    /roast/load_lot/:id(.:format)                            roast#load_lot
#              roast_new_lot GET    /roast/new_lot(.:format)                                 roast#new_lot
#          onboarding_step_1 GET    /onboarding/step_1(.:format)                             onboarding#step_1
#                  dashboard GET    /dashboard(.:format)                                     dashboard#index
#           new_user_session GET    /users/sign_in(.:format)                                 devise/sessions#new
#               user_session POST   /users/sign_in(.:format)                                 devise/sessions#create
#       destroy_user_session DELETE /users/sign_out(.:format)                                devise/sessions#destroy
#          new_user_password GET    /users/password/new(.:format)                            devise/passwords#new
#         edit_user_password GET    /users/password/edit(.:format)                           devise/passwords#edit
#              user_password PATCH  /users/password(.:format)                                devise/passwords#update
#                            PUT    /users/password(.:format)                                devise/passwords#update
#                            POST   /users/password(.:format)                                devise/passwords#create
#   cancel_user_registration GET    /users/cancel(.:format)                                  registrations#cancel
#      new_user_registration GET    /users/sign_up(.:format)                                 registrations#new
#     edit_user_registration GET    /users/edit(.:format)                                    registrations#edit
#          user_registration PATCH  /users(.:format)                                         registrations#update
#                            PUT    /users(.:format)                                         registrations#update
#                            DELETE /users(.:format)                                         registrations#destroy
#                            POST   /users(.:format)                                         registrations#create
#                       root GET    /                                                        high_voltage/pages#show {:id=>"home"}
#                       home GET    /home(.:format)                                          redirect(301, /)
#                            GET    /                                                        high_voltage/pages#show {:id=>"home"}
#                       page GET    /*id                                                     high_voltage/pages#show

require 'high_voltage'

Rails.application.routes.draw do

  namespace :admin do
    resources :plans
    get 'dashboard', to: 'dashboard#index'
  end

  resources :roaster_profiles, path: "roasters" do
    collection do
      get :step1, to: "roaster_profiles#new"
      get :step2
      get :step3
      get :step4
    end
  end

  resources :producer_profiles, path: "producers" do
    resources :crops
    resources :lots
  end

  resources :roast, only: [:index]
  get 'roast/step_1/:id', to: 'roast#step_1'
  post 'roast/step_2', to: 'roast#step_2'
  post 'roast/step_3', to: 'roast#step_3'
  get 'roast/load_lot/:id', to: 'roast#load_lot'
  get 'roast/new_lot', to: 'roast#new_lot'
  get 'onboarding/step_1', to: 'onboarding#step_1'
  get 'dashboard', to: 'dashboard#index'

  devise_for :users, controllers: { registrations: "users/registrations" }

  # root to: 'dashboard#index'
  # root to: 'pages#show', id: 'home'
  root 'high_voltage/pages#show', id: 'home'

end
