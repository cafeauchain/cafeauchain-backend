module InventoryServices
  class UpdateBatchQueue
    def self.load_queue(inventory_item)
      pounds_needed = inventory_item.amount_to_roast.to_f
      roast_count = (pounds_needed / (inventory_item.roast_size * (1 - (inventory_item.shrinkage/100)))).ceil
      if inventory_item.batches.where(status: :in_queue).empty?
        inventory_item.batches.create(
          status: :in_queue, 
          target_weight: pounds_needed, 
          lot: inventory_item.lot, 
          roast_date: (Time.now + 1.day).to_date,
          roast_count: roast_count
        )
      else
        batch = inventory_item.batches.where(status: :in_queue).first
        batch.update(target_weight: pounds_needed, roast_count: roast_count)
      end
    end
  end
end
