module InventoryServices
  class UpdateBatchQueue
    def self.load_queue(variant)
      pounds_needed = (variant.custom_options["size"].to_f/16.to_f) * variant.quantity.abs
      inventory_items = variant.product.product_inventory_items.collect{ |item| [item.inventory_item.id, ((item.percentage_of_product/100) * pounds_needed)] }
      inventory_items.each do |inventory_item|
        item = InventoryItem.find(inventory_item[0])
        if item.batches.where(status: :in_queue).empty?
          item.batches.create(status: :in_queue, target_weight: inventory_item[1], lot: item.lot, roast_date: (Time.now + 1.day).to_date)
        else
          batch = item.batches.where(status: :in_queue).first
          batch.update(target_weight: (batch.target_weight + inventory_item[1]))
        end
      end
    end
  end
end