module Api::V1
  class InvoicesController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_invoice

    def update
      if params[:payment_source].present?
        @charge = StripeServices::CreateInvoiceCharge.charge(@invoice, params[:payment_source], true)
        render json: @invoice.order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
      elsif params[:status].present? && params[:status] == "paid_in_full"
        @invoice.update(status: params[:status], memo: params[:memo], payment_status: :offline, fee: 0)
        render json: @invoice.order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
      elsif params[:discount].present? && params[:process_discount].present?
        tax = (@invoice.taxable + @invoice[:discount].to_f - params[:discount].to_f) * @invoice.tax_rate
        @invoice.update(discount: params[:discount], tax: tax)
        render json: @invoice.order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
      end
    end

    private

    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

  end
end
