# == Schema Information
#
# Table name: batches
#
#  id                :uuid             not null, primary key
#  ending_amount     :float
#  roast_date        :date
#  roast_size        :float
#  starting_amount   :float
#  status            :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  inventory_item_id :uuid
#  lot_id            :uuid
#
# Indexes
#
#  index_batches_on_created_at         (created_at)
#  index_batches_on_inventory_item_id  (inventory_item_id)
#  index_batches_on_lot_id             (lot_id)
#

require 'rails_helper'

RSpec.describe Batch, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
