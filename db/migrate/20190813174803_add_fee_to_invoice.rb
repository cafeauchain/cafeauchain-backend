class AddFeeToInvoice < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :fee, :float, :default => 0
  end
end
