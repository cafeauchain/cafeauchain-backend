# == Route Map
#
# I, [2019-06-28T16:52:30.710744 #33667]  INFO -- sentry: ** [Raven] Raven 2.9.0 ready to catch errors
#                                         Prefix Verb   URI Pattern                                                                              Controller#Action
#      upload_csv_api_v1_admin_producer_profiles POST   /api/v1/admin/producers/upload_csv(.:format)                                             api/v1/admin/producer_profiles#upload_csv
#                 api_v1_admin_producer_profiles GET    /api/v1/admin/producers(.:format)                                                        api/v1/admin/producer_profiles#index
#                                                POST   /api/v1/admin/producers(.:format)                                                        api/v1/admin/producer_profiles#create
#              new_api_v1_admin_producer_profile GET    /api/v1/admin/producers/new(.:format)                                                    api/v1/admin/producer_profiles#new
#             edit_api_v1_admin_producer_profile GET    /api/v1/admin/producers/:id/edit(.:format)                                               api/v1/admin/producer_profiles#edit
#                  api_v1_admin_producer_profile GET    /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#show
#                                                PATCH  /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#update
#                                                PUT    /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#update
#                                                DELETE /api/v1/admin/producers/:id(.:format)                                                    api/v1/admin/producer_profiles#destroy
#                           api_v1_subscriptions GET    /api/v1/subscriptions(.:format)                                                          api/v1/subscriptions#index
#                                                POST   /api/v1/subscriptions(.:format)                                                          api/v1/subscriptions#create
#                        new_api_v1_subscription GET    /api/v1/subscriptions/new(.:format)                                                      api/v1/subscriptions#new
#                       edit_api_v1_subscription GET    /api/v1/subscriptions/:id/edit(.:format)                                                 api/v1/subscriptions#edit
#                            api_v1_subscription GET    /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#show
#                                                PATCH  /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#update
#                                                PUT    /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#update
#                                                DELETE /api/v1/subscriptions/:id(.:format)                                                      api/v1/subscriptions#destroy
#                  api_v1_producer_profile_crops GET    /api/v1/producers/:producer_profile_id/crops(.:format)                                   api/v1/crops#index
#                                                POST   /api/v1/producers/:producer_profile_id/crops(.:format)                                   api/v1/crops#create
#               new_api_v1_producer_profile_crop GET    /api/v1/producers/:producer_profile_id/crops/new(.:format)                               api/v1/crops#new
#              edit_api_v1_producer_profile_crop GET    /api/v1/producers/:producer_profile_id/crops/:id/edit(.:format)                          api/v1/crops#edit
#                   api_v1_producer_profile_crop GET    /api/v1/producers/:producer_profile_id/crops/:id(.:format)                               api/v1/crops#show
#                                                PATCH  /api/v1/producers/:producer_profile_id/crops/:id(.:format)                               api/v1/crops#update
#                                                PUT    /api/v1/producers/:producer_profile_id/crops/:id(.:format)                               api/v1/crops#update
#                                                DELETE /api/v1/producers/:producer_profile_id/crops/:id(.:format)                               api/v1/crops#destroy
#                       api_v1_producer_profiles GET    /api/v1/producers(.:format)                                                              api/v1/producer_profiles#index
#                                                POST   /api/v1/producers(.:format)                                                              api/v1/producer_profiles#create
#                    new_api_v1_producer_profile GET    /api/v1/producers/new(.:format)                                                          api/v1/producer_profiles#new
#                   edit_api_v1_producer_profile GET    /api/v1/producers/:id/edit(.:format)                                                     api/v1/producer_profiles#edit
#                        api_v1_producer_profile GET    /api/v1/producers/:id(.:format)                                                          api/v1/producer_profiles#show
#                                                PATCH  /api/v1/producers/:id(.:format)                                                          api/v1/producer_profiles#update
#                                                PUT    /api/v1/producers/:id(.:format)                                                          api/v1/producer_profiles#update
#                                                DELETE /api/v1/producers/:id(.:format)                                                          api/v1/producer_profiles#destroy
#                                         api_v1 DELETE /api/v1/delete_image/:id(.:format)                                                       api/v1/products#delete_image
#          validate_step_api_v1_roaster_profiles POST   /api/v1/roasters/validate_step(.:format)                                                 api/v1/roaster_profiles#validate_step
#             api_v1_roaster_profile_update_logo PUT    /api/v1/roasters/:roaster_profile_id/update_logo(.:format)                               api/v1/roaster_profiles#update_logo
#            api_v1_roaster_profile_lots_by_date GET    /api/v1/roasters/:roaster_profile_id/lots_by_date(.:format)                              api/v1/lots#lots_by_date
#          api_v1_roaster_profile_earliest_batch GET    /api/v1/roasters/:roaster_profile_id/earliest_batch(.:format)                            api/v1/lots#earliest
#   api_v1_roaster_profile_update_onboard_status PUT    /api/v1/roasters/:roaster_profile_id/update_onboard_status(.:format)                     api/v1/roaster_profiles#update_onboard_status
# api_v1_roaster_profile_update_wholesale_status PUT    /api/v1/roasters/:roaster_profile_id/update_wholesale_status(.:format)                   api/v1/roaster_profiles#update_wholesale_status
#     upload_lot_csv_api_v1_roaster_profile_lots POST   /api/v1/roasters/:roaster_profile_id/lots/upload_lot_csv(.:format)                       api/v1/lots#upload_lot_csv
#                    api_v1_roaster_profile_lots GET    /api/v1/roasters/:roaster_profile_id/lots(.:format)                                      api/v1/lots#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/lots(.:format)                                      api/v1/lots#create
#                 new_api_v1_roaster_profile_lot GET    /api/v1/roasters/:roaster_profile_id/lots/new(.:format)                                  api/v1/lots#new
#                edit_api_v1_roaster_profile_lot GET    /api/v1/roasters/:roaster_profile_id/lots/:id/edit(.:format)                             api/v1/lots#edit
#                     api_v1_roaster_profile_lot GET    /api/v1/roasters/:roaster_profile_id/lots/:id(.:format)                                  api/v1/lots#show
#                                                PATCH  /api/v1/roasters/:roaster_profile_id/lots/:id(.:format)                                  api/v1/lots#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/lots/:id(.:format)                                  api/v1/lots#update
#                                                DELETE /api/v1/roasters/:roaster_profile_id/lots/:id(.:format)                                  api/v1/lots#destroy
#                   api_v1_roaster_profile_crops GET    /api/v1/roasters/:roaster_profile_id/crops(.:format)                                     api/v1/roaster_profiles#crops
#        api_v1_roaster_profile_wholesale_signup POST   /api/v1/roasters/:roaster_profile_id/wholesale_signup(.:format)                          api/v1/roaster_profiles#wholesale_signup
#                 api_v1_roaster_profile_batches GET    /api/v1/roasters/:roaster_profile_id/batches(.:format)                                   api/v1/batches#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/batches(.:format)                                   api/v1/batches#create
#               new_api_v1_roaster_profile_batch GET    /api/v1/roasters/:roaster_profile_id/batches/new(.:format)                               api/v1/batches#new
#              edit_api_v1_roaster_profile_batch GET    /api/v1/roasters/:roaster_profile_id/batches/:id/edit(.:format)                          api/v1/batches#edit
#                   api_v1_roaster_profile_batch GET    /api/v1/roasters/:roaster_profile_id/batches/:id(.:format)                               api/v1/batches#show
#                                                PATCH  /api/v1/roasters/:roaster_profile_id/batches/:id(.:format)                               api/v1/batches#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/batches/:id(.:format)                               api/v1/batches#update
#                                                DELETE /api/v1/roasters/:roaster_profile_id/batches/:id(.:format)                               api/v1/batches#destroy
#            api_v1_roaster_profile_transactions GET    /api/v1/roasters/:roaster_profile_id/transactions(.:format)                              api/v1/transactions#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/transactions(.:format)                              api/v1/transactions#create
#         new_api_v1_roaster_profile_transaction GET    /api/v1/roasters/:roaster_profile_id/transactions/new(.:format)                          api/v1/transactions#new
#        edit_api_v1_roaster_profile_transaction GET    /api/v1/roasters/:roaster_profile_id/transactions/:id/edit(.:format)                     api/v1/transactions#edit
#             api_v1_roaster_profile_transaction GET    /api/v1/roasters/:roaster_profile_id/transactions/:id(.:format)                          api/v1/transactions#show
#                                                PATCH  /api/v1/roasters/:roaster_profile_id/transactions/:id(.:format)                          api/v1/transactions#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/transactions/:id(.:format)                          api/v1/transactions#update
#                                                DELETE /api/v1/roasters/:roaster_profile_id/transactions/:id(.:format)                          api/v1/transactions#destroy
#         api_v1_roaster_profile_inventory_items GET    /api/v1/roasters/:roaster_profile_id/inventory_items(.:format)                           api/v1/inventory_items#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/inventory_items(.:format)                           api/v1/inventory_items#create
#      new_api_v1_roaster_profile_inventory_item GET    /api/v1/roasters/:roaster_profile_id/inventory_items/new(.:format)                       api/v1/inventory_items#new
#     edit_api_v1_roaster_profile_inventory_item GET    /api/v1/roasters/:roaster_profile_id/inventory_items/:id/edit(.:format)                  api/v1/inventory_items#edit
#          api_v1_roaster_profile_inventory_item GET    /api/v1/roasters/:roaster_profile_id/inventory_items/:id(.:format)                       api/v1/inventory_items#show
#                                                PATCH  /api/v1/roasters/:roaster_profile_id/inventory_items/:id(.:format)                       api/v1/inventory_items#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/inventory_items/:id(.:format)                       api/v1/inventory_items#update
#                                                DELETE /api/v1/roasters/:roaster_profile_id/inventory_items/:id(.:format)                       api/v1/inventory_items#destroy
#      add_images_api_v1_roaster_profile_product POST   /api/v1/roasters/:roaster_profile_id/products/:id/add_images(.:format)                   api/v1/products#add_images
#                api_v1_roaster_profile_products GET    /api/v1/roasters/:roaster_profile_id/products(.:format)                                  api/v1/products#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/products(.:format)                                  api/v1/products#create
#             new_api_v1_roaster_profile_product GET    /api/v1/roasters/:roaster_profile_id/products/new(.:format)                              api/v1/products#new
#            edit_api_v1_roaster_profile_product GET    /api/v1/roasters/:roaster_profile_id/products/:id/edit(.:format)                         api/v1/products#edit
#                 api_v1_roaster_profile_product GET    /api/v1/roasters/:roaster_profile_id/products/:id(.:format)                              api/v1/products#show
#                                                PATCH  /api/v1/roasters/:roaster_profile_id/products/:id(.:format)                              api/v1/products#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/products/:id(.:format)                              api/v1/products#update
#                                                DELETE /api/v1/roasters/:roaster_profile_id/products/:id(.:format)                              api/v1/products#destroy
#                api_v1_roaster_profile_variants GET    /api/v1/roasters/:roaster_profile_id/variants(.:format)                                  api/v1/products#variants
#         api_v1_roaster_profile_default_options GET    /api/v1/roasters/:roaster_profile_id/default_options(.:format)                           api/v1/default_options#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/default_options(.:format)                           api/v1/default_options#create
#          api_v1_roaster_profile_default_option PATCH  /api/v1/roasters/:roaster_profile_id/default_options/:id(.:format)                       api/v1/default_options#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/default_options/:id(.:format)                       api/v1/default_options#update
#           api_v1_roaster_profile_subscriptions GET    /api/v1/roasters/:roaster_profile_id/subscriptions(.:format)                             api/v1/roaster_profiles#subscriptions
#                   api_v1_roaster_profile_cards POST   /api/v1/roasters/:roaster_profile_id/cards(.:format)                                     api/v1/roaster_profiles#cards
#                                                DELETE /api/v1/roasters/:roaster_profile_id/cards(.:format)                                     api/v1/roaster_profiles#remove_card
#          api_v1_roaster_profile_set_as_default PUT    /api/v1/roasters/:roaster_profile_id/set_as_default(.:format)                            api/v1/roaster_profiles#set_as_default
#        api_v1_roaster_profile_shipping_methods GET    /api/v1/roasters/:roaster_profile_id/shipping_methods(.:format)                          api/v1/shipping_methods#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/shipping_methods(.:format)                          api/v1/shipping_methods#create
#                 api_v1_roaster_profile_cutoffs GET    /api/v1/roasters/:roaster_profile_id/cutoffs(.:format)                                   api/v1/cutoffs#index
#                                                POST   /api/v1/roasters/:roaster_profile_id/cutoffs(.:format)                                   api/v1/cutoffs#create
#                  api_v1_roaster_profile_cutoff PATCH  /api/v1/roasters/:roaster_profile_id/cutoffs/:id(.:format)                               api/v1/cutoffs#update
#                                                PUT    /api/v1/roasters/:roaster_profile_id/cutoffs/:id(.:format)                               api/v1/cutoffs#update
#                        api_v1_roaster_profiles POST   /api/v1/roasters(.:format)                                                               api/v1/roaster_profiles#create
#                         api_v1_roaster_profile PATCH  /api/v1/roasters/:id(.:format)                                                           api/v1/roaster_profiles#update
#                                                PUT    /api/v1/roasters/:id(.:format)                                                           api/v1/roaster_profiles#update
#                               api_v1_get_rates GET    /api/v1/get_rates(.:format)                                                              api/v1/shipping_methods#get_rates
#                                   api_v1_carts GET    /api/v1/carts(.:format)                                                                  api/v1/carts#index
#                                                POST   /api/v1/carts(.:format)                                                                  api/v1/carts#create
#                                new_api_v1_cart GET    /api/v1/carts/new(.:format)                                                              api/v1/carts#new
#                               edit_api_v1_cart GET    /api/v1/carts/:id/edit(.:format)                                                         api/v1/carts#edit
#                                    api_v1_cart GET    /api/v1/carts/:id(.:format)                                                              api/v1/carts#show
#                                                PATCH  /api/v1/carts/:id(.:format)                                                              api/v1/carts#update
#                                                PUT    /api/v1/carts/:id(.:format)                                                              api/v1/carts#update
#                                                DELETE /api/v1/carts/:id(.:format)                                                              api/v1/carts#destroy
#                                  api_v1_orders GET    /api/v1/orders(.:format)                                                                 api/v1/orders#index
#                                                POST   /api/v1/orders(.:format)                                                                 api/v1/orders#create
#                               new_api_v1_order GET    /api/v1/orders/new(.:format)                                                             api/v1/orders#new
#                              edit_api_v1_order GET    /api/v1/orders/:id/edit(.:format)                                                        api/v1/orders#edit
#                                   api_v1_order GET    /api/v1/orders/:id(.:format)                                                             api/v1/orders#show
#                                                PATCH  /api/v1/orders/:id(.:format)                                                             api/v1/orders#update
#                                                PUT    /api/v1/orders/:id(.:format)                                                             api/v1/orders#update
#                                                DELETE /api/v1/orders/:id(.:format)                                                             api/v1/orders#destroy
#                 api_v1_customer_update_address POST   /api/v1/customers/:customer_id/update_address(.:format)                                  api/v1/customers#update_address
#                          api_v1_customer_cards POST   /api/v1/customers/:customer_id/cards(.:format)                                           api/v1/customers#cards
#                 api_v1_customer_set_as_default PUT    /api/v1/customers/:customer_id/set_as_default(.:format)                                  api/v1/customers#set_as_default
#                    api_v1_customer_remove_card DELETE /api/v1/customers/:customer_id/remove_card(.:format)                                     api/v1/customers#remove_card
#          api_v1_customer_update_onboard_status PUT    /api/v1/customers/:customer_id/update_onboard_status(.:format)                           api/v1/customers#update_onboard_status
#           api_v1_customer_set_shipping_default PUT    /api/v1/customers/:customer_id/set_shipping_default(.:format)                            api/v1/customers#set_shipping_default
#                       add_logo_api_v1_customer POST   /api/v1/customers/:id/add_logo(.:format)                                                 api/v1/customers#add_logo
#                               api_v1_customers GET    /api/v1/customers(.:format)                                                              api/v1/customers#index
#                                                POST   /api/v1/customers(.:format)                                                              api/v1/customers#create
#                            new_api_v1_customer GET    /api/v1/customers/new(.:format)                                                          api/v1/customers#new
#                           edit_api_v1_customer GET    /api/v1/customers/:id/edit(.:format)                                                     api/v1/customers#edit
#                                api_v1_customer GET    /api/v1/customers/:id(.:format)                                                          api/v1/customers#show
#                                                PATCH  /api/v1/customers/:id(.:format)                                                          api/v1/customers#update
#                                                PUT    /api/v1/customers/:id(.:format)                                                          api/v1/customers#update
#                                                DELETE /api/v1/customers/:id(.:format)                                                          api/v1/customers#destroy
#                          api_v1_password_reset POST   /api/v1/password_reset(.:format)                                                         api/v1/password#password_reset
#                                 api_v1_invoice PATCH  /api/v1/invoices/:id(.:format)                                                           api/v1/invoices#update
#                                                PUT    /api/v1/invoices/:id(.:format)                                                           api/v1/invoices#update
#                                    admin_plans GET    /admin/plans(.:format)                                                                   admin/plans#index
#                                                POST   /admin/plans(.:format)                                                                   admin/plans#create
#                                 new_admin_plan GET    /admin/plans/new(.:format)                                                               admin/plans#new
#                                edit_admin_plan GET    /admin/plans/:id/edit(.:format)                                                          admin/plans#edit
#                                     admin_plan GET    /admin/plans/:id(.:format)                                                               admin/plans#show
#                                                PATCH  /admin/plans/:id(.:format)                                                               admin/plans#update
#                                                PUT    /admin/plans/:id(.:format)                                                               admin/plans#update
#                                                DELETE /admin/plans/:id(.:format)                                                               admin/plans#destroy
#                        admin_producer_profiles GET    /admin/producers(.:format)                                                               admin/producer_profiles#index
#                                                POST   /admin/producers(.:format)                                                               admin/producer_profiles#create
#                     new_admin_producer_profile GET    /admin/producers/new(.:format)                                                           admin/producer_profiles#new
#                    edit_admin_producer_profile GET    /admin/producers/:id/edit(.:format)                                                      admin/producer_profiles#edit
#                         admin_producer_profile GET    /admin/producers/:id(.:format)                                                           admin/producer_profiles#show
#                                                PATCH  /admin/producers/:id(.:format)                                                           admin/producer_profiles#update
#                                                PUT    /admin/producers/:id(.:format)                                                           admin/producer_profiles#update
#                                                DELETE /admin/producers/:id(.:format)                                                           admin/producer_profiles#destroy
#                                admin_dashboard GET    /admin/dashboard(.:format)                                                               admin/dashboard#index
#                               roaster_profiles GET    /roasters(.:format)                                                                      roaster_profiles#index
#                            new_roaster_profile GET    /roasters/new(.:format)                                                                  roaster_profiles#new
#                           edit_roaster_profile GET    /roasters/:id/edit(.:format)                                                             roaster_profiles#edit
#                                roaster_profile GET    /roasters/:id(.:format)                                                                  roaster_profiles#show
#                               manage_dashboard GET    /manage/dashboard(.:format)                                                              manage/primary#dashboard
#                               manage_inventory GET    /manage/inventory(.:format)                                                              manage/primary#inventory
#                                  manage_orders GET    /manage/orders(.:format)                                                                 manage/orders#index
#                                   manage_order GET    /manage/orders/:id(.:format)                                                             manage/orders#show
#                               manage_customers GET    /manage/customers(.:format)                                                              manage/customers#index
#                                manage_customer GET    /manage/customers/:id(.:format)                                                          manage/customers#show
#                               manage_wholesale GET    /manage/wholesale(.:format)                                                              manage/primary#wholesale
#                            manage_subscription GET    /manage/subscription(.:format)                                                           manage/primary#subscription
#                                    manage_lots GET    /manage/lots(.:format)                                                                   manage/lots#index
#                                     manage_lot GET    /manage/lots/:id(.:format)                                                               manage/lots#show
#                                manage_products GET    /manage/products(.:format)                                                               manage/products#index
#                        manage_production_index GET    /manage/production(.:format)                                                             manage/production#index
#                             onboarding_profile GET    /onboarding/profile(.:format)                                                            onboarding/onboarding#profile
#                                onboarding_lots GET    /onboarding/lots(.:format)                                                               onboarding/onboarding#lots
#                      onboarding_roast_profiles GET    /onboarding/roast_profiles(.:format)                                                     onboarding/onboarding#roast_profiles
#                   onboarding_wholesale_details GET    /onboarding/wholesale_details(.:format)                                                  onboarding/onboarding#wholesale_details
#                    onboarding_wholesale_signup GET    /onboarding/wholesale_signup(.:format)                                                   onboarding/onboarding#wholesale_signup
#                            onboarding_shipping GET    /onboarding/shipping(.:format)                                                           onboarding/onboarding#shipping
#                            onboarding_products GET    /onboarding/products(.:format)                                                           onboarding/onboarding#products
#                         producer_profile_crops GET    /producers/:producer_profile_id/crops(.:format)                                          crops#index
#                                                POST   /producers/:producer_profile_id/crops(.:format)                                          crops#create
#                      new_producer_profile_crop GET    /producers/:producer_profile_id/crops/new(.:format)                                      crops#new
#                     edit_producer_profile_crop GET    /producers/:producer_profile_id/crops/:id/edit(.:format)                                 crops#edit
#                          producer_profile_crop GET    /producers/:producer_profile_id/crops/:id(.:format)                                      crops#show
#                                                PATCH  /producers/:producer_profile_id/crops/:id(.:format)                                      crops#update
#                                                PUT    /producers/:producer_profile_id/crops/:id(.:format)                                      crops#update
#                                                DELETE /producers/:producer_profile_id/crops/:id(.:format)                                      crops#destroy
#                          producer_profile_lots GET    /producers/:producer_profile_id/lots(.:format)                                           lots#index
#                                                POST   /producers/:producer_profile_id/lots(.:format)                                           lots#create
#                       new_producer_profile_lot GET    /producers/:producer_profile_id/lots/new(.:format)                                       lots#new
#                      edit_producer_profile_lot GET    /producers/:producer_profile_id/lots/:id/edit(.:format)                                  lots#edit
#                           producer_profile_lot GET    /producers/:producer_profile_id/lots/:id(.:format)                                       lots#show
#                                                PATCH  /producers/:producer_profile_id/lots/:id(.:format)                                       lots#update
#                                                PUT    /producers/:producer_profile_id/lots/:id(.:format)                                       lots#update
#                                                DELETE /producers/:producer_profile_id/lots/:id(.:format)                                       lots#destroy
#                              producer_profiles GET    /producers(.:format)                                                                     producer_profiles#index
#                                                POST   /producers(.:format)                                                                     producer_profiles#create
#                           new_producer_profile GET    /producers/new(.:format)                                                                 producer_profiles#new
#                          edit_producer_profile GET    /producers/:id/edit(.:format)                                                            producer_profiles#edit
#                               producer_profile GET    /producers/:id(.:format)                                                                 producer_profiles#show
#                                                PATCH  /producers/:id(.:format)                                                                 producer_profiles#update
#                                                PUT    /producers/:id(.:format)                                                                 producer_profiles#update
#                                                DELETE /producers/:id(.:format)                                                                 producer_profiles#destroy
#                                      dashboard GET    /dashboard(.:format)                                                                     dashboard#index
#                               new_user_session GET    /users/sign_in(.:format)                                                                 users/sessions#new
#                                   user_session POST   /users/sign_in(.:format)                                                                 users/sessions#create
#                           destroy_user_session DELETE /users/sign_out(.:format)                                                                users/sessions#destroy
#                              new_user_password GET    /users/password/new(.:format)                                                            users/passwords#new
#                             edit_user_password GET    /users/password/edit(.:format)                                                           users/passwords#edit
#                                  user_password PATCH  /users/password(.:format)                                                                users/passwords#update
#                                                PUT    /users/password(.:format)                                                                users/passwords#update
#                                                POST   /users/password(.:format)                                                                users/passwords#create
#                       cancel_user_registration GET    /users/cancel(.:format)                                                                  users/registrations#cancel
#                          new_user_registration GET    /users/sign_up(.:format)                                                                 users/registrations#new
#                         edit_user_registration GET    /users/edit(.:format)                                                                    users/registrations#edit
#                              user_registration PATCH  /users(.:format)                                                                         users/registrations#update
#                                                PUT    /users(.:format)                                                                         users/registrations#update
#                                                DELETE /users(.:format)                                                                         users/registrations#destroy
#                                                POST   /users(.:format)                                                                         users/registrations#create
#                                         logout GET    /logout(.:format)                                                                        devise/sessions#destroy
#                                          login GET    /login(.:format)                                                                         devise/sessions#create
#                                         signup GET    /signup(.:format)                                                                        devise/registrations#new
#                                       register GET    /register(.:format)                                                                      devise/registrations#new
#                                           cart GET    /cart(.:format)                                                                          carts#index
#                             shop_profile_index GET    /shop/profile(.:format)                                                                  shop/profile#index
#                           shop_profile_payment GET    /shop/profile/payment(.:format)                                                          shop/profile#payment
#                         shop_profile_addresses GET    /shop/profile/addresses(.:format)                                                        shop/profile#addresses
#                                    shop_orders GET    /shop/orders(.:format)                                                                   shop/orders#index
#                                     shop_order GET    /shop/orders/:id(.:format)                                                               shop/orders#show
#                           shop_onboard_profile GET    /shop/onboard/profile(.:format)                                                          shop/onboard#profile
#                         shop_onboard_addresses GET    /shop/onboard/addresses(.:format)                                                        shop/onboard#addresses
#                           shop_onboard_payment GET    /shop/onboard/payment(.:format)                                                          shop/onboard#payment
#                          shop_onboard_shipping GET    /shop/onboard/shipping(.:format)                                                         shop/onboard#shipping
#                 shop_onboard_onboard_completed GET    /shop/onboard/onboard_completed(.:format)                                                shop/onboard#onboard_completed
#                                           root GET    /                                                                                        shop/shop#index
#                                                GET    /                                                                                        high_voltage/pages#show {:id=>"home"}
#                                           home GET    /home(.:format)                                                                          redirect(301, /)
#                                                GET    /                                                                                        high_voltage/pages#show {:id=>"home"}
#                                           page GET    /*id                                                                                     high_voltage/pages#show
#                             rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#                      rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#                             rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#                      update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#                           rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

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
        resources :roaster_profiles, path: "roasters"
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
        resources :shipping_methods, only: [:index, :create]
        resources :cutoffs, only: [:index, :update]
      end
      get :get_rates, to: "shipping_methods#get_rates"
      resources :carts
      resources :orders
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
  end

  resources :roaster_profiles, path: "roasters", only: [:index, :new, :show, :edit]

  namespace :manage do
    get "dashboard", to: "primary#dashboard"
    get "inventory", to: "primary#inventory"
    resources :orders, only: [:show, :index]
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
    get "/logout" => "devise/sessions#destroy"
    get "/login" => "devise/sessions#create"
    get "/signup" => "devise/registrations#new"
    get "/register" => "devise/registrations#new"
  end

  constraints(ValidSubdomain) do
    # Customer 'View' Routes
    get 'cart', to: 'carts#index'
    namespace :shop do
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
