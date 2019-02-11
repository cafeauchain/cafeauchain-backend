class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :trial_end, :status, :next_bill_date, :period_start_date, :period_end_date

  def period_start_date
    if Date.today > object.trial_end
      object.next_bill_date - 30.days
    else
      object.trial_end - 30.days
    end
  end

  def period_end_date
    if Date.today > object.trial_end
      object.next_bill_date
    else
      object.trial_end
    end
  end
  
  
end
