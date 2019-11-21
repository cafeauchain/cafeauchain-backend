require 'date'
module Api::V1
    class PayoutsController < ApplicationController
        
        def index
            Stripe.api_key = Rails.application.credentials[Rails.env.to_sym][:stripe_secret_key]
            acct_id = current_user.roaster_profile[:stripe_account_id]
            
            @payouts = Stripe::Payout.list({ limit: 100, status: 'paid' }, { stripe_account: acct_id })
            invoices = current_user.roaster_profile.invoices
            payouts = @payouts.data.map {|payout|
                payout[:created] = DateTime.strptime(payout[:created].to_s, "%s")
                @transactions = Stripe::BalanceTransaction.list({ limit: 100, payout: payout.id, type: "payment" }, { stripe_account: acct_id })
                payout[:trxs] = @transactions.data.map {|trx| 
                    trx_date = DateTime.strptime(trx[:created].to_s, "%s").to_date
                    trx_available_on = DateTime.strptime(trx[:available_on].to_s, "%s")
                    trx_created = DateTime.strptime(trx[:created].to_s, "%s")
                    invoice = invoices.select{|i| 
                        i.total_in_cents == trx[:amount]# && trx_date == i[:paid_date]
                    }.map{|i|
                        {
                            invoice_id: i[:id], 
                            order_id: i[:order_id], 
                            paid_date: i[:paid_date]}
                    }
                    {
                        trx_date: trx_date,
                        trx_gross: trx[:amount],
                        trx_net: trx[:net],
                        trx_available: trx_available_on,
                        trx_created: trx_created,
                        trx_invoices: invoice,
                        id: trx[:id]
                    }
                }
                payout
            }
            render json: payouts
        end
        
    end
end
