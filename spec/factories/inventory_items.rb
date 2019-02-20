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
#
# Indexes
#
#  index_inventory_items_on_lot_id  (lot_id)
#
# Foreign Keys
#
#  fk_rails_...  (lot_id => lots.id)
#

FactoryBot.define do
  factory :inventory_item do
    product { nil }
    quantity { 1.5 }
    par_level { 1.5 }
    lot { nil }
  end
end
