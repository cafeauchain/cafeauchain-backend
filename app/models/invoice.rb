# == Schema Information
#
# Table name: invoices
#
#  id                :bigint(8)        not null, primary key
#  fee               :float            default(0.0)
#  memo              :string
#  payment_status    :integer
#  payment_type      :integer
#  shipping          :float
#  status            :integer
#  subtotal          :float
#  tax               :float
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
  belongs_to :order

  before_update :check_total

  enum status: [:draft, :processing, :payment_authorized, :awaiting_payment, :partial_payment, :paid_in_full]
  enum payment_type: [:card_on_file, :terms_with_vendor]
  enum payment_status: [:offline, :stripe]

  def total
    self.subtotal.to_f + self.tax.to_f + self.shipping.to_f
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
