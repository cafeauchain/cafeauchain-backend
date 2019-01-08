# == Schema Information
#
# Table name: batches
#
#  id              :bigint(8)        not null, primary key
#  ending_amount   :float
#  starting_amount :float
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

FactoryBot.define do
  factory :batch do
    lot nil
    starting_amount 1.5
    ending_amount 1.5
  end
end