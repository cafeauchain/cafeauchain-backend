class AddMethodToInvoices < ActiveRecord::Migration[5.2]
  def change
    add_column :invoices, :memo, :string
  end
end
