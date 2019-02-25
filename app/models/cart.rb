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
    
  end

  def convert_to_order
    
  end
  
  
end
