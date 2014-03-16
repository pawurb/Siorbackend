class AddDefaultValueToScoreAndGameplays < ActiveRecord::Migration
  def change
    change_column :users, :best_score, :integer, default: 0
    change_column :users, :gameplays, :integer, default: 0
  end
end
