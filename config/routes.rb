# == Route Map
#
#                   Prefix Verb   URI Pattern                          Controller#Action
#         roaster_profiles GET    /roaster_profiles(.:format)          roaster_profiles#index
#                          POST   /roaster_profiles(.:format)          roaster_profiles#create
#      new_roaster_profile GET    /roaster_profiles/new(.:format)      roaster_profiles#new
#     edit_roaster_profile GET    /roaster_profiles/:id/edit(.:format) roaster_profiles#edit
#          roaster_profile GET    /roaster_profiles/:id(.:format)      roaster_profiles#show
#                          PATCH  /roaster_profiles/:id(.:format)      roaster_profiles#update
#                          PUT    /roaster_profiles/:id(.:format)      roaster_profiles#update
#                          DELETE /roaster_profiles/:id(.:format)      roaster_profiles#destroy
#        producer_profiles GET    /producers(.:format)                 producer_profiles#index
#                          POST   /producers(.:format)                 producer_profiles#create
#     new_producer_profile GET    /producers/new(.:format)             producer_profiles#new
#    edit_producer_profile GET    /producers/:id/edit(.:format)        producer_profiles#edit
#         producer_profile GET    /producers/:id(.:format)             producer_profiles#show
#                          PATCH  /producers/:id(.:format)             producer_profiles#update
#                          PUT    /producers/:id(.:format)             producer_profiles#update
#                          DELETE /producers/:id(.:format)             producer_profiles#destroy
#         new_user_session GET    /users/sign_in(.:format)             devise/sessions#new
#             user_session POST   /users/sign_in(.:format)             devise/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)            devise/sessions#destroy
#        new_user_password GET    /users/password/new(.:format)        devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)       devise/passwords#edit
#            user_password PATCH  /users/password(.:format)            devise/passwords#update
#                          PUT    /users/password(.:format)            devise/passwords#update
#                          POST   /users/password(.:format)            devise/passwords#create
# cancel_user_registration GET    /users/cancel(.:format)              registrations#cancel
#    new_user_registration GET    /users/sign_up(.:format)             registrations#new
#   edit_user_registration GET    /users/edit(.:format)                registrations#edit
#        user_registration PATCH  /users(.:format)                     registrations#update
#                          PUT    /users(.:format)                     registrations#update
#                          DELETE /users(.:format)                     registrations#destroy
#                          POST   /users(.:format)                     registrations#create
#                     root GET    /                                    high_voltage/pages#show {:id=>"home"}
#                     page GET    /*id                                 high_voltage/pages#show

require 'high_voltage'

Rails.application.routes.draw do

  resources :crops
  resources :roaster_profiles, path: "roasters"
  resources :producer_profiles, path: "producers"
  devise_for :users, controllers: { registrations: "registrations" }

  root to: 'high_voltage/pages#show', id: 'home'

end
