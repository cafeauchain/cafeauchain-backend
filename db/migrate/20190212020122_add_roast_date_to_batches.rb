class AddRoastDateToBatches < ActiveRecord::Migration[5.2]
  def change
    add_column :batches, :roast_date, :date
  end
end
