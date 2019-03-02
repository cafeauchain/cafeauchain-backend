class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.integer :status
      t.float :subtotal
      t.float :tax
      t.float :total
      t.integer :payment_type
      t.string :stripe_invoice_id

      t.timestamps
    end
  end
end
