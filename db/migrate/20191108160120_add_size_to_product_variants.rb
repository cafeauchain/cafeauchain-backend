class AddSizeToProductVariants < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :size, :string
  end
end
