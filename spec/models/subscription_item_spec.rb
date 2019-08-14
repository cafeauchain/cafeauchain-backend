# == Schema Information
#
# Table name: subscription_items
#
#  id                 :bigint(8)        not null, primary key
#  description        :string
#  stripe_meta_name   :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  stripe_sub_item_id :string
#  subscription_id    :string
#

require 'rails_helper'

RSpec.describe SubscriptionItem, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
