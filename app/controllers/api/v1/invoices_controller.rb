module Api::V1
  class InvoicesController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_invoice

    def update
      @charge = StripeServices::CreateInvoiceCharge.charge(@invoice, payment_source)
      render json: {payment_processed: true}, status: 200
    end

    private

    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

  end
end
