# == Schema Information
#
# Table name: transactions
#
#  id         :bigint(8)        not null, primary key
#  quantity   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  crop_id    :bigint(8)
#  tx_id      :string
#
# Indexes
#
#  index_transactions_on_crop_id  (crop_id)
#
# Foreign Keys
#
#  fk_rails_...  (crop_id => crops.id)
#

class Transaction < ApplicationRecord
  belongs_to :crop
end
