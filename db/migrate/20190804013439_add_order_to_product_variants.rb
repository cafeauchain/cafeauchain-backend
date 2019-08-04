class AddOrderToProductVariants < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :sortorder, :int
    Product.all.each { |product| product.product_variants.select{ |pv| !pv.inactive? }.each_with_index { |pv, i| pv.update( sortorder: i + 1 )} }
  end
end
