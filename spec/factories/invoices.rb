# == Schema Information
#
# Table name: invoices
#
#  id                :bigint(8)        not null, primary key
#  payment_type      :integer
#  status            :integer
#  subtotal          :float
#  tax               :float
#  total             :float
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

FactoryBot.define do
  factory :invoice do
    status { 1 }
    subtotal { 1.5 }
    tax { 1.5 }
    total { 1.5 }
    payment_type { 1 }
  end
end
