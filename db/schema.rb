# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181219170909) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "batches", force: :cascade do |t|
    t.bigint "lot_id"
    t.float "starting_amount"
    t.float "ending_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lot_id"], name: "index_batches_on_lot_id"
  end

  create_table "crops", force: :cascade do |t|
    t.bigint "producer_profile_id"
    t.string "varietal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "region"
    t.string "country"
    t.string "harvest_season"
    t.string "altitude"
    t.string "process"
    t.index ["producer_profile_id"], name: "index_crops_on_producer_profile_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "lots", force: :cascade do |t|
    t.bigint "crop_id"
    t.bigint "roaster_profile_id"
    t.float "price_per_pound"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "pounds_of_coffee"
    t.string "harvest_year"
    t.index ["crop_id"], name: "index_lots_on_crop_id"
    t.index ["roaster_profile_id"], name: "index_lots_on_roaster_profile_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "stripe_plan_id"
    t.integer "price_in_cents"
    t.string "interval"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "producer_profiles", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "slug"
    t.string "wallet_address"
    t.string "rpc_port"
    t.string "network_port"
    t.string "latitude"
    t.string "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roaster_profiles", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "slug"
    t.string "url"
    t.string "twitter"
    t.string "facebook"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "status"
    t.string "stripe_customer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "crop_id"
    t.string "tx_id"
    t.string "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "trans_type", default: 0
    t.bigint "roaster_profile_id"
    t.bigint "lot_id"
    t.bigint "batch_id"
    t.index ["batch_id"], name: "index_transactions_on_batch_id"
    t.index ["crop_id"], name: "index_transactions_on_crop_id"
    t.index ["lot_id"], name: "index_transactions_on_lot_id"
    t.index ["roaster_profile_id"], name: "index_transactions_on_roaster_profile_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.bigint "roaster_profile_id"
    t.boolean "admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["roaster_profile_id"], name: "index_users_on_roaster_profile_id"
  end

  create_table "wallets", force: :cascade do |t|
    t.bigint "producer_profile_id"
    t.bigint "roaster_profile_id"
    t.string "roaster_wallet"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["producer_profile_id"], name: "index_wallets_on_producer_profile_id"
    t.index ["roaster_profile_id"], name: "index_wallets_on_roaster_profile_id"
  end

  add_foreign_key "batches", "lots"
  add_foreign_key "crops", "producer_profiles"
  add_foreign_key "lots", "crops"
  add_foreign_key "lots", "roaster_profiles"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "transactions", "batches"
  add_foreign_key "transactions", "crops"
  add_foreign_key "transactions", "lots"
  add_foreign_key "transactions", "roaster_profiles"
  add_foreign_key "users", "roaster_profiles"
  add_foreign_key "wallets", "producer_profiles"
  add_foreign_key "wallets", "roaster_profiles"
end
