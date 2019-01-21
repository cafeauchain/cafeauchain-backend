json.subscription_id @subscription.id
json.trial_end       @subscription.trial_end
json.status          @subscription.status
json.next_charge     @subscription.next_charge_amount

json.subscription_items @subscription.subscription_items do |si|
  json.plan_name  si.plan_name
  json.quantity   si.quantity
  json.plan_price si.plan_price_in_cents
  json.interval   si.plan.interval
end

json.subscription_charges @subscription.subscription_charges do |sc|
  json.charge_date sc.created_at
  json.amount      sc.amount 
end