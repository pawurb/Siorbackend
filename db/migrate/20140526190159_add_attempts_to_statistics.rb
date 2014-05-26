class AddAttemptsToStatistics < ActiveRecord::Migration
  def change
    add_column :statistics, :attempts, :integer, default: 1
  end
end
