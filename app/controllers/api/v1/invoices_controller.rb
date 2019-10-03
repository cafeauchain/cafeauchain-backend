module Api::V1
  class InvoicesController < ApplicationController
    before_action :set_cart
    before_action :authenticate_user!
    before_action :set_invoice, only: [:update]

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
      elsif params[:paid_date].present? && params[:update_paid_date_only].present?
        @invoice.update(paid_date: params[:paid_date])
        render json: @invoice.order, status: 200, serializer: OrderSerializer::SingleOrderSerializer
      end
    end

    def index
      @roaster = current_user.roaster_profile
      # beginning_of_month = Time.current.beginning_of_month
      # end_of_month = beginning_of_month.end_of_month
      # end_date = params[:end_date] || Date.today.strftime("%F")
      # range = params[:start_date] ? (params[:start_date]..end_date) : (beginning_of_month..end_of_month)

      @invoices = @roaster.invoices.filter(params.slice(:order_range, :paid_range, :status, :order_by))
      render json: @invoices, status: 200, each_serializer: InvoiceSerializer
    end

    private

    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

  end
end
