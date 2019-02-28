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

class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :slug, :composition, :product_images, :product_image_urls

  def composition
    self.object.product_inventory_items.map do |item|
      { name: item.product_name, pct: item.percentage_of_product, inventory_item_id: item.inventory_item.id, id: item.id }
    end
  end
end
