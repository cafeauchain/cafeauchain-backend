class AddMissingIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :cart_items, :product_variant_id
    add_index :customer_profiles, :owner_id
    add_index :order_items, :product_variant_id
    add_index :roaster_profiles, :owner_id
  end
end
