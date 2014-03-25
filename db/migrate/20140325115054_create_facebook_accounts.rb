class CreateFacebookAccounts < ActiveRecord::Migration
  def change
    create_table :facebook_accounts do |t|
      t.string :provider
      t.string :uid
      t.string :oauth_token
      t.string :image_url
      t.string :location
      t.string :name

      t.datetime :oauth_expires_at
      t.datetime :birthday

      t.integer :user_id

      t.timestamps
    end

    add_index :facebook_accounts, :user_id

    remove_column :users, :provider
    remove_column :users, :uid
    remove_column :users, :oauth_token
    remove_column :users, :oauth_expires_at
    remove_column :users, :name
    remove_column :users, :location
    remove_column :users, :birthday
    remove_column :users, :image_url
  end
end
