module InventoryServices
  class GetAmountsNeeded
    def self.process(orders, byDate = false)
      item_quantities = []
      quantities = orders.each do |o|
        order_items = o.order_items.each do |oi|
          product = oi.product_variant.product.product_inventory_items.select{ |pii| !pii.inactive }.each do |pii|
            order_item_weight_in_oz = oi.product_variant.custom_options["size"].to_i * oi.quantity.to_i * pii.percentage_of_product.to_i / 100
            amount_needed_for_order = order_item_weight_in_oz.to_f / 16
            iq = {
              "ii_id" => pii.inventory_item_id,
              "pii_id" => pii.id,
              "weight" => amount_needed_for_order,
              "roast_date" => o.roast_date
            }
            item_quantities << iq
          end
        end
      end

      grouper = ['ii_id']
      if byDate
        grouper = ['ii_id', 'roast_date']
      end

      item_quantities = item_quantities.group_by{|iq| iq.values_at(*grouper)}.map {|key, hashes|
        result = hashes[0].clone
        result["weight"] = hashes.inject(0){ |total, item| total + item["weight"] }
        result
      }
    end
  end
end
