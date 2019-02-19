class CreateProductVariants < ActiveRecord::Migration[5.2]
  def change
    create_table :product_variants do |t|
      t.references :product, foreign_key: true
      t.integer :quantity
      t.string :variant_title
      t.jsonb :custom_options

      t.timestamps
    end
  end
end
