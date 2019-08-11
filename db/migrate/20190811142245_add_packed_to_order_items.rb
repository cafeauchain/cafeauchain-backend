class AddPackedToOrderItems < ActiveRecord::Migration[5.2]
  def change
    add_column :order_items, :packed, :bool, default: false
  end
end
