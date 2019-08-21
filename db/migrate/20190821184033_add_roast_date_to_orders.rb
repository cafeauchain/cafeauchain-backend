class AddRoastDateToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :roast_date, :date
  end
end
