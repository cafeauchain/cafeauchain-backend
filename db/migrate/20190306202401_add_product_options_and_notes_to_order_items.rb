class AddProductOptionsAndNotesToOrderItems < ActiveRecord::Migration[5.2]
  def change
    add_column :order_items, :product_options, :string, array: true, default: []
    add_column :order_items, :notes, :string
  end
end
