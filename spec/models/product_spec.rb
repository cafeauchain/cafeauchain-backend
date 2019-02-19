# == Schema Information
#
# Table name: products
#
#  id          :bigint(8)        not null, primary key
#  description :text
#  slug        :string
#  status      :integer
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Product, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
