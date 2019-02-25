# == Schema Information
#
# Table name: products
#
#  id                 :bigint(8)        not null, primary key
#  description        :text
#  slug               :string
#  status             :integer
#  title              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  roaster_profile_id :bigint(8)
#
# Indexes
#
#  index_products_on_roaster_profile_id  (roaster_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (roaster_profile_id => roaster_profiles.id)
#

class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :slug, :composition

  def composition
    self.object.product_inventory_items.map do |itm|
      { name: itm.product_name, pct: itm.percentage_of_product, id: itm.inventory_item.id }
    end
  end
end
