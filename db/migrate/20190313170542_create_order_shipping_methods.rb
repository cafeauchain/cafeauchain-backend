class CreateOrderShippingMethods < ActiveRecord::Migration[5.2]
  def change
    create_table :order_shipping_methods do |t|
      t.references :order, foreign_key: true
      t.references :shipping_method, foreign_key: true
      t.integer :final_rate

      t.timestamps
    end
  end
end
