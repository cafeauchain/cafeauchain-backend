class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.integer :status
      t.string :title
      t.text :description
      t.string :slug

      t.timestamps
    end
  end
end
