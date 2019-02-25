# == Schema Information
#
# Table name: product_inventory_items
#
#  id                    :uuid             not null, primary key
#  percentage_of_product :float
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  inventory_item_id     :uuid
#  product_id            :uuid
#
# Indexes
#
#  index_product_inventory_items_on_created_at         (created_at)
#  index_product_inventory_items_on_inventory_item_id  (inventory_item_id)
#  index_product_inventory_items_on_product_id         (product_id)
#

class ProductInventoryItem < ApplicationRecord
  belongs_to :product
  belongs_to :inventory_item

  def product_name
    inventory_item.name
  end
end
