class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.boolean :approved, default: false, null: false
      t.text :content, null: false

      t.timestamps null: false
    end
  end
end
