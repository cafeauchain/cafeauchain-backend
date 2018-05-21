class AddRoasterProfileIdToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_reference :transactions, :roaster_profile, foreign_key: true
  end
end
