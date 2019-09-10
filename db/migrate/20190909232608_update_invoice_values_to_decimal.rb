class UpdateInvoiceValuesToDecimal < ActiveRecord::Migration[5.2]
  def change
    change_column :invoices, :subtotal, :decimal, :precision => 8, :scale => 2
    change_column :invoices, :tax, :decimal, :precision => 8, :scale => 2
    change_column :invoices, :shipping, :decimal, :precision => 8, :scale => 2
    change_column :invoices, :fee, :decimal, :precision => 8, :scale => 2
  end
end
