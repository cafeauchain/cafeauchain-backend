# == Schema Information
#
# Table name: products
#
#  id                 :uuid             not null, primary key
#  description        :text
#  product_options    :jsonb
#  slug               :string
#  status             :integer
#  title              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_products_on_created_at          (created_at)
#  index_products_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class Product < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  acts_as_taggable_on :categories

  has_many_attached :product_images
  has_many :product_variants

  has_many :product_inventory_items
  has_many :inventory_items, through: :product_inventory_items

  enum status: [:draft, :out_of_season, :live, :coming_soon]

  def compare_composition(composition_array)
    changed_inventory_items = []
    composition_array.each do |comp|
      pii = ProductInventoryItem.find_by(product: self, inventory_item_id: comp[:inventory_item_id])
      if !pii.nil? && pii.percentage_of_product != comp[:pct] 
        changed_inventory_items << comp[:inventory_item_id]
      end
    end
    return !changed_inventory_items.empty?
  end
  
end
