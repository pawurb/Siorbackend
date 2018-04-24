class RemoveLocation < ActiveRecord::Migration
  def change
    remove_column :statistics, :city, :string
  end
end
