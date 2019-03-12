module InventoryServices
  class UpdateProductInventoryFromOrder
    def self.update(order)
      order.order_items.each do |order_item|
        product = order_item.product_variant.product.product_inventory_items.select{ |pii| !pii.inactive }.map do |pii|
          order_item_weight = order_item.product_variant.custom_options["size"].to_i / 16 * order_item.quantity.to_i * pii.percentage_of_product.to_i / 100
          inventory_item = pii.inventory_item
          inventory_item_weight = inventory_item.quantity
          new_ii_weight = inventory_item_weight.to_f - order_item_weight.to_f
          pii.inventory_item.update( quantity: new_ii_weight)
          if( inventory_item.quantity.to_f < inventory_item.par_level.to_f)
            queue = InventoryServices::UpdateBatchQueue.load_queue(inventory_item)
          end
        end
      end
    end
  end
end
