class OrderShippingMethod < ApplicationRecord
  belongs_to :order
  belongs_to :shipping_method
end
