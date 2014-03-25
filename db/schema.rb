# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140325115104) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: true do |t|
    t.integer  "user_id"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "accounts", ["user_id"], name: "index_accounts_on_user_id", using: :btree

  create_table "facebook_accounts", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "oauth_token"
    t.string   "image_url"
    t.string   "location"
    t.string   "name"
    t.datetime "oauth_expires_at"
    t.datetime "birthday"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "facebook_accounts", ["user_id"], name: "index_facebook_accounts_on_user_id", using: :btree

  create_table "statistics", force: true do |t|
    t.integer  "score"
    t.integer  "duration"
    t.string   "ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.integer  "best_score", default: 0
    t.integer  "gameplays",  default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nickname"
  end

end
