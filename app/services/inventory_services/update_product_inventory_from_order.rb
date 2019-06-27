module InventoryServices
  class UpdateProductInventoryFromOrder
    def self.update(order)
      current_order = InventoryServices::GetAmountsNeeded.process([order])
      all_open_orders = order.customer_profile.orders.where.not(status: (:draft||:fulfilled))
      all_orders_for_date = all_open_orders.select{|ao|ao.estimated_roast_date == order.estimated_roast_date}
      all_orders = InventoryServices::GetAmountsNeeded.process(all_orders_for_date)

      current_order.each{ |co|
        inventory_item = InventoryItem.find(co["ii_id"])
        amount_available = inventory_item.quantity.to_f
        par = inventory_item.par_level.to_f
        overall = all_orders.find{ |ao| ao["ii_id"] == co["ii_id"] and ao["roast_date"] == co["roast_date"] }
        amount_needed_overall = overall["weight"]
        amount_remaining = amount_available - amount_needed_overall - par

        roast_needed = amount_remaining < 0
        if roast_needed.present?
          InventoryServices::UpdateBatchQueue.load_queue(inventory_item, amount_remaining.abs, co["roast_date"])
        end
      }
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
