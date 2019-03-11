module InventoryServices
  class UpdateVariantInventory
    def self.update(order)
      order.order_items.each do |order_item|
        variant = order_item.product_variant
        variant.update(quantity: (variant.quantity - order_item.quantity))
        if variant.quantity < 0
          queue = InventoryServices::UpdateBatchQueue.load_queue(variant)
        end
      end
    end
  end  
end