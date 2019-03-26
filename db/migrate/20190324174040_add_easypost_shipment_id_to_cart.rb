class AddEasypostShipmentIdToCart < ActiveRecord::Migration[5.2]
  def change
    add_column :carts, :easypost_shipment_id, :string
  end
end
