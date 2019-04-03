class AddInactiveToProductVariants < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :inactive, :bool, default: false
  end
end
