class AddShippingWeightToProductVariants < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :shipping_weight, :int
  end
end
