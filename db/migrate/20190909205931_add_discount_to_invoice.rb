class AddDiscountToInvoice < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :discount, :decimal, :precision => 7, :scale => 2
  end
end
