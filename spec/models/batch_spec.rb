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

require 'rails_helper'

RSpec.describe Batch, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
