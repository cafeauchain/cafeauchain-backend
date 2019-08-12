module Api::V1
  class InvoicesController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_invoice

    def update
      if params[:payment_source].present?
        @charge = StripeServices::CreateInvoiceCharge.charge(@invoice, params[:payment_source])
        render json: {payment_processed: true}, status: 200
      elsif params[:status].present? && params[:status] == "paid_in_full"
        @invoice.update(status: params[:status], memo: params[:memo], payment_status: :offline)
        render json: @invoice.order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
      end
    end

    private

    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

  end
end
