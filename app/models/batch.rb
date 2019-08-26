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

class Batch < ApplicationRecord
  include Filterable
  include ActiveModel::Validations
  validates_with BatchCheckAmountAvailableValidator

  belongs_to :lot
  belongs_to :inventory_item

  enum status: [:in_queue, :roast_in_progress, :roast_completed, :bagged_for_sale]

  scope :status, -> (status) { status == "all" ? all : where( status: status ) }

  def batch_cost # starting weight
    starting_amount * lot.price_per_pound
  end

  def target_weight
    all_amounts = self.lot.roaster_profile.getOpenOrderAmountsByDate
    all_amounts_for_item = all_amounts.select{ |item| item["ii_id"] == self.inventory_item_id}
    # earliest_date = all_amounts_for_item.map{|aafm| aafm["roast_date"]}.min
    earliest_date = all_amounts_for_item.length > 0 ? all_amounts_for_item.min_by{|aafm| aafm["roast_date"]}["roast_date"] : nil
    current_inventory = earliest_date == self.roast_date ? self.inventory_item.quantity.to_f : 0

    target = all_amounts_for_item.find{ |item| self.roast_date == item["roast_date"]}
    target.present? ? (target["weight"] - current_inventory).round(2) : 0
  end

  def roast_count
    if self.status == "roast_in_progress"
      (self.starting_amount / self.inventory_item.roast_size).ceil
    elsif self.status == "in_queue"
      (target_weight / (self.inventory_item.roast_size * (1 - (self.inventory_item.shrinkage/100.0)))).ceil
    end
    
  end
end
