# == Schema Information
#
# Table name: invoices
#
#  id                :bigint(8)        not null, primary key
#  discount          :decimal(7, 2)
#  fee               :decimal(8, 2)    default(0.0)
#  memo              :string
#  paid_date         :date
#  payment_status    :integer
#  payment_type      :integer
#  shipping          :decimal(8, 2)
#  status            :integer
#  subtotal          :decimal(8, 2)
#  tax               :decimal(8, 2)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  order_id          :bigint(8)
#  stripe_invoice_id :string
#
# Indexes
#
#  index_invoices_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#

class Invoice < ApplicationRecord
  include Filterable
  belongs_to :order

  before_update :check_total

  enum status: [:draft, :processing, :payment_authorized, :awaiting_payment, :partial_payment, :paid_in_full]
  enum payment_type: [:card_on_file, :terms_with_vendor]
  enum payment_status: [:offline, :stripe]

  scope :status, -> (status) { status == "all" ? all : (where status: status) }

  def self.order_range(range)
    range(range, "created_at")
  end

  def self.paid_range(range)
    range(range, "paid_date")
  end

  def self.range(range, field)
    case range
    when "last_month"
      where("#{field}": 1.month.ago.all_month)
    when "this_month"
      where("#{field}": Date.today.all_month)
    when "last_week"
      where("#{field}": 1.week.ago.all_week)
    when "this_week"
      where("#{field}": Date.today.all_week)
    when "yesterday"
      where("#{field}": Date.yesterday.all_day)
    when "today"
      where("#{field}": Date.today.all_day)
    else
      begin
        range = range.split("::")
        start = range[0].to_date.beginning_of_day
        endval = range[1].present? ? range[1].to_date : Date.today 
        dates = start..endval.end_of_day
        where("#{field}": dates)    
      rescue
        all
      end
    end
  end

  def self.order_by(order_by)
    parts = order_by.split
    case parts[0]
    when "order_date"
      order("invoices.created_at #{parts[1]}")
    else
      order(order_by)
    end
  end

  def taxable
    self.subtotal.to_f + self.shipping.to_f - self.discount.to_f
  end

  def tax_rate
    self.order.wholesale_profile.tax_rate.to_f / 100.0
  end

  def total
    taxable + self.tax.to_f
  end
  def total_in_cents
    (self.total * 100).to_i
  end

  def total_fee
    minimum = 250
    base_application_fee = (self.total_in_cents * 0.034).ceil 
    return base_application_fee < minimum ? minimum : base_application_fee
  end

  def application_fee
    transaction_fee = (self.total_in_cents * 0.029 + 30).round
    return self.total_fee - transaction_fee
  end

  def check_total
    if !self[:stripe_invoice_id].nil?
      Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
      orig_invoice = Stripe::Charge.retrieve(self.stripe_invoice_id)

      if self.total_in_cents > orig_invoice[:amount]
        refund = Stripe::Refund.create({
          charge: self[:stripe_invoice_id]
        })
        if refund
          @charge = StripeServices::CreateInvoiceCharge.charge(self, orig_invoice.source)
        end
      end
    end

  end
end
