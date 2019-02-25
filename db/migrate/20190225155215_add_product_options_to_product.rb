class AddProductOptionsToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :product_options, :jsonb
  end
end
