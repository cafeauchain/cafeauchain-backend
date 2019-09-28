class InvoiceSerializer < ActiveModel::Serializer
  attributes :id, :order_date, :paid_date, :status, :payment_status, 
  :subtotal, :shipping, :discount, :taxable, :tax, :total, :fee, :net

  # TODO Should probably move all of these to the model
  # And or format correctly there
  def order_date
    self.object.created_at.to_date
  end
  def paid_date
    self.object.updated_at.to_date
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
