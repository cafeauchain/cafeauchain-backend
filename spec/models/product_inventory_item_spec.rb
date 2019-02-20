# == Schema Information
#
# Table name: product_inventory_items
#
#  id                    :bigint(8)        not null, primary key
#  percentage_of_product :float
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  inventory_item_id     :bigint(8)
#  product_id            :bigint(8)
#
# Indexes
#
#  index_product_inventory_items_on_inventory_item_id  (inventory_item_id)
#  index_product_inventory_items_on_product_id         (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (inventory_item_id => inventory_items.id)
#  fk_rails_...  (product_id => products.id)
#

require 'rails_helper'

RSpec.describe ProductInventoryItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
