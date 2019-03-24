class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :owner, :email, :company_name, :addresses, :terms, :order_count, :order_value, :logo_url, :wholesale_profile, :primary_address

  def wholesale_profile
    self.object.wholesale_profiles.find_by(roaster_profile: scope)
  end
  
  def terms
    wp = self.object.wholesale_profiles.find_by(roaster_profile: scope)
    if wp.present?
      wp.terms
    end
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

  def orders
    self.object.orders.map do |order|
      OrderSerializer.new(order)
    end
  end
end
class SingleCustomerSerializer < CustomerSerializer
  attributes :orders
end
