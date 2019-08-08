# == Schema Information
#
# Table name: invoices
#
#  id                :bigint(8)        not null, primary key
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

  enum status: [:draft, :awaiting_payment, :partial_payment, :paid_in_full]
  enum payment_type: [:card_on_file, :terms_with_vendor]

  def total
    self.subtotal.to_f + self.tax.to_f + self.shipping.to_f
  end
  def total_in_cents
    (self.total * 100).to_i
  end
end
