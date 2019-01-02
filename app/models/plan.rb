# == Schema Information
#
# Table name: plans
#
#  id             :bigint(8)        not null, primary key
#  interval       :string
#  name           :string
#  price_in_cents :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  stripe_plan_id :string
#

class Plan < ApplicationRecord
end
