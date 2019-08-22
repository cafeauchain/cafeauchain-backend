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
  scope :customer, -> (customer) { joins(:customer_profile).where("customer_profiles.id = #{customer}") }

  scope :invoice_status, -> (invoice_status) { invoice_status == "all" ? all : includes(:invoice).where( "invoices.status": invoice_status )}

  def self.order_by(order_by)
    parts = order_by.split
    case parts[0]
    when "order_date"
      order("orders.created_at #{parts[1]}")
    when "subtotal"
      includes(:invoice).order("invoices.subtotal #{parts[1]}")
    when "shipping"
      includes(:invoice).order("invoices.shipping #{parts[1]}")
    when "invoice_status"
      includes(:invoice).order("invoices.status #{parts[1]}")
    when "company_name"
      includes(:customer_profile).order("customer_profiles.company_name #{parts[1]}")
    when "status"
      order("orders.status #{parts[1]}")
    when "id"
      order("orders.id #{parts[1]}")
    when "order_total"
      temp = all.sort{|a,b| a.order_total.to_f <=> b.order_total.to_f }
      if parts[1] == 'desc'
        return temp.reverse
      end
      return temp
    when "total_weight"
      temp = all.sort{|a,b| a.total_weight <=> b.total_weight }
      if parts[1] == 'desc'
        return temp.reverse
      end
      return temp
    else
      order(order_by)
    end
  end

  def self.range(range)
    case range
    when "last_month"
      where(created_at: 1.month.ago.all_month)
    when "this_month"
      where(created_at: Date.today.all_month)
    when "last_week"
      where(created_at: 1.week.ago.all_week)
    when "this_week"
      where(created_at: Date.today.all_week)
    when "yesterday"
      where(created_at: Date.yesterday.all_day)
    when "today"
      where(created_at: Date.today.all_day)
    else
      begin
        range = range.split("::")
        start = range[0].to_date.beginning_of_day
        endval = range[1].present? ? range[1].to_date : Date.today 
        dates = start..endval.end_of_day
        where(created_at: dates)    
      rescue
        all
      end
      
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

  def invoice_status
    self.invoice.status
  end

end
