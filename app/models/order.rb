# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  easypost_shipment_id :string
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_orders_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

class Order < ApplicationRecord
  belongs_to :wholesale_profile
  has_one :customer_profile, through: :wholesale_profile
  has_one :roaster_profile, through: :wholesale_profile
  has_many :order_items
  has_one :invoice
  has_one :order_shipping_method
  has_one :shipping_method, through: :order_shipping_method

  enum status: [:draft, :processing, :awaiting_payment, :paid_in_full, :fulfilled]

  def roaster_name
    wholesale_profile.roaster_profile.name
  end

  def subtotal
    '%.2f' % (order_items.sum { |oi| oi.product_variant.price_in_cents.to_f/100.0 * oi.quantity })
  end

  def total_line_items
    order_items.length
  end

  def total_items
    order_items.sum { |oi| oi.quantity }
  end

  def total_weight
    order_items.sum { |oi| oi.product_variant.custom_options["size"].to_i * oi.quantity }
  end

  def order_date
    created_at
  end

  def company_name
    customer_profile.company_name
  end

  def terms
    wholesale_profile.terms
  end
end
