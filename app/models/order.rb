# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  roast_date           :date
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
  include Filterable
  before_update :check_status

  belongs_to :wholesale_profile
  has_one :customer_profile, through: :wholesale_profile
  has_one :roaster_profile, through: :wholesale_profile
  has_many :order_items
  has_one :invoice
  has_one :order_shipping_method
  has_one :shipping_method, through: :order_shipping_method

  enum status: [:draft, :processing, :packed, :shipped, :fulfilled]
  
  scope :open_orders, -> (status) { where status: status === "open" ? [:processing, :packed, :shipped] : status }
  scope :status, -> (status) { status == "all" ? all : open_orders(status) }

  attr_accessor :temp_total_weight

  def self.order_by(order_by)
    parts = order_by.split
    case parts[0]
    when "order_date"
      order("created_at #{parts[1]}")
    when "subtotal"
      includes(:invoice).order("invoices.subtotal #{parts[1]}")
    when "shipping"
      includes(:invoice).order("invoices.shipping #{parts[1]}")
    when "company_name"
      includes(:customer_profile).order("customer_profiles.company_name #{parts[1]}")
    when "total_weight"
      temp = all.each{|order| order.temp_total_weight = order.total_weight}.sort{|a,b| a.temp_total_weight <=> b.temp_total_weight }
      if parts[1] == 'desc'
        return temp.reverse
      end
      return temp
    else
      order(order_by)
    end
  end

  def check_status
    if self.status_changed?
      if self.status == "shipped"
        if !self.invoice[:stripe_invoice_id].nil?
          self.invoice.update(status: :payment_authorized)
        else
          self.invoice.update(status: :awaiting_payment)
        end
      end
    end
  end

  def roaster_name
    wholesale_profile.roaster_profile.name
  end

  def subtotal
    '%.2f' % (order_items.sum { |oi| oi.product_variant.price_in_cents.to_f/100.0 * oi.quantity })
  end

  def total_line_items
    order_items.length
  end

  def order_total
    '%.2f' % (invoice.total)
  end

  def shipping
    order_shipping_method.final_rate.to_f
  end

  def taxes
    invoice.tax.to_i
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

  def invoice_fee
    '%.2f' % (self.invoice.fee.to_f)
  end

  def order_net
    '%.2f' % (self.order_total.to_f - self.invoice_fee.to_f)
  end

end
