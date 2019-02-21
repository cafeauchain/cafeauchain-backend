# == Schema Information
#
# Table name: customer_profiles
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#

class CustomerProfile < ApplicationRecord

  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true
  
  has_many :users
  has_many :addresses, as: :addressable, dependent: :destroy

end
