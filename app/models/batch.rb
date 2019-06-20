# == Schema Information
#
# Table name: batches
#
#  id                :uuid             not null, primary key
#  ending_amount     :float
#  roast_count       :integer
#  roast_date        :date
#  roast_size        :float
#  starting_amount   :float
#  status            :integer
#  target_weight     :float
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

class Batch < ApplicationRecord
  include ActiveModel::Validations
  validates_with BatchCheckAmountAvailableValidator

  belongs_to :lot
  belongs_to :inventory_item

  enum status: [:in_queue, :roast_in_progress, :roast_completed, :bagged_for_sale]

  def batch_cost # starting weight
    starting_amount * lot.price_per_pound
  end
end
