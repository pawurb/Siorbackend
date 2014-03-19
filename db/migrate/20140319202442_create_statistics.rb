class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.integer :score
      t.integer :duration
      t.string :ip

      t.timestamps
    end
  end
end
