module InventoryServices
  class UpdateProductInventoryFromOrder
    def self.update(order)
      order.order_items.each do |order_item|
        product = order_item.product_variant.product.product_inventory_items.select{ |pii| !pii.inactive }.map do |pii|
          order_item_weight_in_oz = order_item.product_variant.custom_options["size"].to_i * order_item.quantity.to_i * pii.percentage_of_product.to_i / 100
          amount_needed_for_order = order_item_weight_in_oz / 16
          inventory_item = pii.inventory_item
          amount_available = inventory_item.quantity.to_f
          amount_needed_overall = inventory_item.quantity_needed.to_f + amount_needed_for_order
          par = inventory_item.par_level.to_f
          amount_remaining = amount_available - amount_needed_overall - par
          inventory_item.update( quantity_needed: amount_needed_overall )
          if amount_remaining < 0
            inventory_item.update( amount_to_roast: amount_remaining.abs )
            InventoryServices::UpdateBatchQueue.load_queue(inventory_item)
          end
        end
      end
    end
    
    def self.fulfill(order)
      order.order_items.each do |order_item|
        product = order_item.product_variant.product.product_inventory_items.select{ |pii| !pii.inactive }.map do |pii|
          order_item_weight_in_oz = order_item.product_variant.custom_options["size"].to_i * order_item.quantity.to_i * pii.percentage_of_product.to_i / 100
          amount_needed_for_order = order_item_weight_in_oz / 16
          inventory_item = pii.inventory_item
          remaining_quantity_available = inventory_item.quantity.to_f - amount_needed_for_order
          remaining_quantity_needed = inventory_item.quantity_needed.to_f - amount_needed_for_order
        
          inventory_item.update( quantity_needed: remaining_quantity_needed, quantity: remaining_quantity_available )
        end
      end
    end
  end
end
