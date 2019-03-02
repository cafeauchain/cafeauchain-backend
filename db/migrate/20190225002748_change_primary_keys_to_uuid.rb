class ChangePrimaryKeysToUuid < ActiveRecord::Migration[5.2]
  def up
    enable_extension 'uuid-ossp'

    tables = [
      "transactions",
      "products",
      "lots",
      "subscription_charges",
      "batches",
      "product_variants",
      "inventory_items",
      "product_inventory_items"
    ]

    tables.each do |table|
      add_column table, :uuid, :uuid, default: "uuid_generate_v4()", null: false
    end

    id_to_uuid("batches", "lot", "lot")
    id_to_uuid("batches", "inventory_item", "inventory_item")
    id_to_uuid("transactions", "lot", "lot")
    id_to_uuid("transactions", "batch", "batch")
    id_to_uuid("inventory_items", "lot", "lot")
    id_to_uuid("product_variants", "product", "product")
    id_to_uuid("product_inventory_items", "product", "product")
    id_to_uuid("product_inventory_items", "inventory_item", "inventory_item")

    tables.each do |table|
      remove_column table, :id
      rename_column table, :uuid, :id
      execute "ALTER TABLE #{table} ADD PRIMARY KEY (id);"
    end
  end

  def id_to_uuid(table_name, relation_name, relation_class)
    table_name = table_name.to_sym
    klass = table_name.to_s.classify.constantize
    relation_klass = relation_class.to_s.classify.constantize
    foreign_key = "#{relation_name}_id".to_sym
    new_foreign_key = "#{relation_name}_uuid".to_sym

    add_column table_name, new_foreign_key, :uuid

    klass.where.not(foreign_key => nil).each do |record|
      if associated_record = relation_klass.find_by(id: record.send(foreign_key))
        record.update_column(new_foreign_key, associated_record.uuid)
      end
    end

    remove_column table_name, foreign_key
    rename_column table_name, new_foreign_key, foreign_key
  end
end
