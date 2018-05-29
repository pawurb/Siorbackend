class RemoveNotNeededStuff < ActiveRecord::Migration
  def change
    drop_table :statistics
    remove_column :users, :ip
  end
end
