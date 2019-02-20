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
<<<<<<< HEAD
#  product_id :bigint(8)
#
# Indexes
#
#  index_inventory_items_on_lot_id      (lot_id)
#  index_inventory_items_on_product_id  (product_id)
=======
#
# Indexes
#
#  index_inventory_items_on_lot_id  (lot_id)
>>>>>>> jb/wholesale-bootstrap
#
# Foreign Keys
#
#  fk_rails_...  (lot_id => lots.id)
<<<<<<< HEAD
#  fk_rails_...  (product_id => products.id)
#

class InventoryItem < ApplicationRecord
  belongs_to :product
  belongs_to :lot

  def lot_name
    lot.name
  end
=======
#

class InventoryItem < ApplicationRecord
  has_many :product_inventory_items
  has_many :products, through: :product_inventory_items
  belongs_to :lot
>>>>>>> jb/wholesale-bootstrap
end
