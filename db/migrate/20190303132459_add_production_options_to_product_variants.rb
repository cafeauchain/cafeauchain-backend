class AddProductionOptionsToProductVariants < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :production_options, :string, array: true, default: []
    add_column :cart_items, :production_options, :string, array: true, default: []
    add_column :cart_items, :notes, :string
  end
end
