# == Schema Information
#
# Table name: orders
#
#  id                   :bigint(8)        not null, primary key
#  status               :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  easypost_shipment_id :string
#  wholesale_profile_id :bigint(8)
#
# Indexes
#
#  index_orders_on_wholesale_profile_id  (wholesale_profile_id)
#
# Foreign Keys
#
#  fk_rails_...  (wholesale_profile_id => wholesale_profiles.id)
#

FactoryBot.define do
  factory :order do
    wholesale_profile { nil }
    status { 1 }
  end
end
