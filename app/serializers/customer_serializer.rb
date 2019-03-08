class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :owner, :addresses, :terms, :order_count, :order_value

  def terms
    wp = self.object.wholesale_profiles.find_by(roaster_profile: scope.roaster_profile)
    wp.terms
  end

  def order_count
    self.object.orders.length
  end

  def order_value
    value = self.object.orders.sum do |order|
      order.order_items.sum { |oi| oi.product_variant.price_in_cents.to_f/100.0 * oi.quantity }
    end
    '%.2f' % (value)
  end
end
