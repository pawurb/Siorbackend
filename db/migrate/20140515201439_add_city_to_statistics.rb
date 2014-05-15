class AddCityToStatistics < ActiveRecord::Migration
  def change
    add_column :statistics, :city, :string
  end
end
