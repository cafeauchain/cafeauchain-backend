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
  include Rails.application.routes.url_helpers
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  acts_as_taggable_on :categories

  has_many_attached :product_images
  has_many :product_variants

  has_many :product_inventory_items
  has_many :inventory_items, through: :product_inventory_items

  belongs_to :roaster_profile

  enum status: [:draft, :out_of_season, :live, :coming_soon]

  def compare_composition(composition_array)
    changed_inventory_items = []
    composition_array.each do |comp|
      pii = ProductInventoryItem.find_by(product: self, inventory_item_id: comp[:inventory_item_id])
      if pii.blank? || (!pii.blank? && pii.percentage_of_product != comp[:pct])
        changed_inventory_items << comp[:inventory_item_id]
      end
    end
    return !changed_inventory_items.empty?
  end

  def composition
    self.product_inventory_items.select{ |pii| !pii.inactive }.map do |item|
      {
        name: item.inventory_item.lot.label + " " + item.product_name,
        pct: item.percentage_of_product,
        inventory_item_id: item.inventory_item.id,
        id: item.id
      }
    end
  end

  def compare_variants(variant_array, existing_array)
    added_variants = []
    removed_variants = []
    changed_variants = []
    new_ids = variant_array.pluck(:id)
    existing_ids = existing_array.pluck(:id)
    added_variants = new_ids - existing_ids
    removed_variants = existing_ids - new_ids
    variant_array.each do |variant|
      pv = ProductVariant.find_by(id: variant[:id])
      if !pv.nil? && (pv.price_in_cents.to_i != variant[:price_in_dollars].to_f * 100 || pv.custom_options["size"].to_s != variant[:size].to_s)
        changed_variants << variant[:id]
      end
    end
    return { changed_variants: changed_variants, added_variants: added_variants, removed_variants: removed_variants }
  end

  def product_image_urls
    self.product_images.map{ |pi| 
      {
        url: Rails.application.routes.url_helpers.rails_blob_path(pi, only_path: true),
        id: pi.id
      }
    }
  end

end
