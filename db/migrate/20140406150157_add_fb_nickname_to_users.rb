class AddFbNicknameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fb_nickname, :string
  end
end
