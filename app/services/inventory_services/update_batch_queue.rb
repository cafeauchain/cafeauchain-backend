module InventoryServices
  class UpdateBatchQueue
    def self.load_queue(inventory_item)
      pounds_needed = inventory_item.par_level.to_f - inventory_item.quantity.to_f
      if inventory_item.batches.where(status: :in_queue).empty?
        inventory_item.batches.create(status: :in_queue, target_weight: pounds_needed, lot: inventory_item.lot, roast_date: (Time.now + 1.day).to_date)
      else
        batch = inventory_item.batches.where(status: :in_queue).first
        batch.update(target_weight: (batch.target_weight.to_f + pounds_needed))
      end
    end
  end
end
