module InventoryServices
  class UpdateProductInventoryFromOrder
    def self.update(order)
      current_order = InventoryServices::GetAmountsNeeded.process([order])
      all_open_orders = order.customer_profile.orders.where(status: :processing)
      all_orders = InventoryServices::GetAmountsNeeded.process(all_open_orders)

      current_order.each{ |co|
        inventory_item = InventoryItem.find(co["ii_id"])
        amount_available = inventory_item.quantity.to_f
        par = inventory_item.par_level.to_f
        overall = all_orders.find{ |ao| ao["ii_id"] == co["ii_id"]}
        amount_needed_overall = overall["weight"]
        amount_remaining = amount_available - amount_needed_overall - par

        roast_needed = amount_remaining < 0
        if roast_needed.present?
          InventoryServices::UpdateBatchQueue.load_queue(inventory_item, co["roast_date"])
        end
      }
    end
    
    def self.fulfill(order)
      current_order = InventoryServices::GetAmountsNeeded.process([order]).each{|co|
        inventory_item = InventoryItem.find(co["ii_id"])
        amount_available = inventory_item.quantity.to_f
        new_amount_available = amount_available - co["weight"].to_f
        inventory_item.update(quantity: new_amount_available)
      }
    end
  end
end
