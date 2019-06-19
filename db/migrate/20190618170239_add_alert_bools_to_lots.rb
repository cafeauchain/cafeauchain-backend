class AddAlertBoolsToLots < ActiveRecord::Migration[5.2]
  def change
    add_column :lots, :on_hand_alert, :bool, default: false
    add_column :lots, :warehouse_alert, :bool, default: false
  end
end
