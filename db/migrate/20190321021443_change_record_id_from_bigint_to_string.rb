class ChangeRecordIdFromBigintToString < ActiveRecord::Migration[5.2]
  def change
    change_column :active_storage_attachments, :record_id, :string
  end
end
