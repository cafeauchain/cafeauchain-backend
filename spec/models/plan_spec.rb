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

require 'rails_helper'

RSpec.describe Plan, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
