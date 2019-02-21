# == Schema Information
#
# Table name: batches
#
#  id                :bigint(8)        not null, primary key
#  ending_amount     :float
#  roast_date        :date
#  starting_amount   :float
#  status            :integer
#  target_weight     :float
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  inventory_item_id :integer
#  lot_id            :bigint(8)
#
# Indexes
#
#  index_batches_on_lot_id  (lot_id)
#
# Foreign Keys
#
#  fk_rails_...  (lot_id => lots.id)
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
