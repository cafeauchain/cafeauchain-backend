class RemoveNotesFromCartItemsAndOrderItems < ActiveRecord::Migration[5.2]
  def change
    remove_column :cart_items, :notes
    remove_column :order_items, :notes
  end
end
