# == Schema Information
#
# Table name: inventory_items
#
#  id         :bigint(8)        not null, primary key
#  par_level  :float
#  quantity   :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  lot_id     :bigint(8)
#  product_id :bigint(8)
#
# Indexes
#
#  index_inventory_items_on_lot_id      (lot_id)
#  index_inventory_items_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (lot_id => lots.id)
#  fk_rails_...  (product_id => products.id)
#

require 'rails_helper'

RSpec.describe InventoryItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
