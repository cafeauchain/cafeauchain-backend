# == Schema Information
#
# Table name: cart_items
#
#  id                 :bigint(8)        not null, primary key
#  quantity           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  cart_id            :bigint(8)
#  product_variant_id :uuid
#
# Indexes
#
#  index_cart_items_on_cart_id  (cart_id)
#
# Foreign Keys
#
#  fk_rails_...  (cart_id => carts.id)
#

require 'rails_helper'

RSpec.describe CartItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
