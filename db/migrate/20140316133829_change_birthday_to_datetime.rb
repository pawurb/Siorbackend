class ChangeBirthdayToDatetime < ActiveRecord::Migration
  def change
    remove_column :users, :birthday
    add_column :users, :birthday, :datetime
  end
end
