class AddEasypostShipmentIdToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :easypost_shipment_id, :string
  end
end
