# == Schema Information
#
# Table name: batches
#
#  id              :bigint(8)        not null, primary key
#  ending_amount   :float
#  roast_date      :date
#  starting_amount :float
#  status          :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  lot_id          :bigint(8)
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
  belongs_to :lot

  validate :check_amount_available

  def check_amount_available
    if starting_amount.to_f > lot.coffee_on_hand.to_f
      errors.add(:starting_amount, "can't be more than coffee on hand")
    end
  end

  enum status: [:roast_in_progress, :roast_completed, :bagged_for_sale]

  def batch_cost # starting weight
    starting_amount * lot.price_per_pound
  end
end
