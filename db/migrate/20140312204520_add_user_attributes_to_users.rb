class AddUserAttributesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :image_url, :string
    add_column :users, :location, :string
    add_column :users, :birthday, :string
    add_column :users, :nickname, :string
  end
end
