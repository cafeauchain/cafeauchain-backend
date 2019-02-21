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

class BatchSerializer < ActiveModel::Serializer
  attributes :id, :starting_amount, :ending_amount, :crop_name, :roast_date, :inventory_item_id

  belongs_to :lot
  belongs_to :inventory_item

  def crop_name
    self.object.lot.crop.name + " (" + self.object.lot.harvest_year + ")"
  end
end
