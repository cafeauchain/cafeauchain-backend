# == Schema Information
#
# Table name: carts
#
#  id                   :bigint(8)        not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_carts_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

class Cart < ApplicationRecord
  has_many :cart_items

  accepts_nested_attributes_for :cart_items, reject_if: ->(attributes){ attributes['quantity'].blank? }, allow_destroy: true

  def add_to_cart(product_variant_id, quantity)
      current_item = cart_items.find_by(product_variant_id: product_variant_id)
      if current_item && current_item.quantity != quantity.to_i
        current_item.update(quantity: quantity.to_i)
      else
        new_item = cart_items.create(product_variant_id: product_variant_id,
          quantity: quantity.to_i,
          cart_id: self.id)
        return new_item
      end
    end
  end

  def convert_to_order
    
  end
  
end
