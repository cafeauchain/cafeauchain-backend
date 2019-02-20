class BatchCheckAmountAvailableValidator < ActiveModel::Validator
  def validate(record)
    if record.starting_amount.to_f > record.lot.coffee_on_hand.to_f
      record.errors.add(:starting_amount, "can't be more than coffee on hand")
    end
  end
end