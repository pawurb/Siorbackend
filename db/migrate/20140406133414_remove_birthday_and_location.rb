class RemoveBirthdayAndLocation < ActiveRecord::Migration
  def change
    remove_column :users, :birthday
    remove_column :users, :location
    add_column :users, :ip, :string
  end
end
