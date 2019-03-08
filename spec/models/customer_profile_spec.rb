# == Schema Information
#
# Table name: customer_profiles
#
#  id           :bigint(8)        not null, primary key
#  company_name :string
#  email        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  owner_id     :integer
#

require 'rails_helper'

RSpec.describe CustomerProfile, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
