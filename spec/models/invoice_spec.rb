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

require 'rails_helper'

RSpec.describe Invoice, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
