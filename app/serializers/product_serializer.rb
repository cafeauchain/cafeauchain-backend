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
  attributes :id, :title, :description, :slug, :composition, :product_image_urls, :product_options, :status, :variants,
  :lots
   #, :variant_options

  def variants
    self.object.product_variants.select {|pv| !pv.inactive? }.sort_by{|pv| pv[:sortorder].to_i }.map do |pv|
      {
        size: pv.custom_options["size"],
        price_in_dollars: '%.2f' % (pv.price_in_cents.to_i/100.0),
        id: pv.id,
        sortorder: pv[:sortorder]
      }
    end
  end

  def variant_options
    object.roaster_profile_id.variant_options.each do |option|
      # title: string, options: array
      { title: option.title, options: option.options }
    end
  end

  def product_options
    if self.object.product_options.present?
      self.object.product_options
    else
      []
    end
  end
end
