class CreateAddOptionsToProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :add_options_to_products do |t|
      t.jsonb :product_options

      t.timestamps
    end
  end
end
