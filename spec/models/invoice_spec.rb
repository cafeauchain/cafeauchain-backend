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

require 'rails_helper'

RSpec.describe Invoice, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
