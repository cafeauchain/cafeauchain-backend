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

class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :order_date, :paid_date, :status, :customer,
  :subtotal, :shipping, :discount, :taxable, :tax, :total, :fee, :net

  # TODO Should probably move all of these to the model
  # And or format correctly there
  def order_date
    self.object.created_at.to_date
  end
  def customer
    self.object.order.customer_profile.company_name
  end
  def subtotal
    self.object.subtotal.to_f.round(2)
  end
  def shipping
    self.object.shipping.to_f.round(2)
  end
  def discount
    self.object.discount.to_f.round(2)
  end
  def taxable
    self.object.taxable.to_f.round(2)
  end
  def tax
    self.object.tax.to_f.round(2)
  end
  def fee
    self.object.fee.to_f.round(2)
  end
  def net
    self.object.order.order_net.to_f.round(2)
  end
end
