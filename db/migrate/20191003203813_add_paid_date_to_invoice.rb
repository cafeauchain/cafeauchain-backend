class AddPaidDateToInvoice < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :paid_date, :date
  end
end
