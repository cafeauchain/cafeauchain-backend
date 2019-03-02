class AddPriceToProductVariant < ActiveRecord::Migration[5.2]
  def change
    add_column :product_variants, :price_in_cents, :integer
  end
end
