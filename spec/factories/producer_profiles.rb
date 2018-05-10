# == Schema Information
#
# Table name: producer_profiles
#
#  id             :bigint(8)        not null, primary key
#  latitude       :string
#  location       :string
#  longitude      :string
#  name           :string
#  network_port   :string
#  rpc_port       :string
#  slug           :string
#  wallet_address :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryBot.define do
  factory :producer_profile do
    name "MyString"
    location "MyString"
    slug "MyString"
    wallet_address "MyString"
    rpc_port "MyString"
    network_port "MyString"
    latitude "MyString"
    longitude "MyString"
  end
end
