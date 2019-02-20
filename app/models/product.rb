# == Schema Information
#
# Table name: products
#
#  id          :bigint(8)        not null, primary key
#  description :text
#  slug        :string
#  status      :integer
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Product < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  has_many_attached :product_images

  has_many :product_inventory_items
  has_many :inventory_items, through: :product_inventory_items
end
