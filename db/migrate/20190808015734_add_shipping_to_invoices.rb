class AddShippingToInvoices < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :shipping, :float
    remove_column :invoices, :total
    Invoice.all.each{|i| i.update(shipping: i.order.order_shipping_method.final_rate)}
  end
end
