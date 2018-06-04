# == Route Map
#
#                     Prefix Verb   URI Pattern                                              Controller#Action
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
#                       page GET    /*id                                                     high_voltage/pages#show

require 'high_voltage'

Rails.application.routes.draw do

  resources :roaster_profiles, path: "roasters"
  resources :producer_profiles, path: "producers" do
    resources :crops
    resources :lots
  end
  devise_for :users, controllers: { registrations: "registrations" }

  root to: 'high_voltage/pages#show', id: 'home'

end
