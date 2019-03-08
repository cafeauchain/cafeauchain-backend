# == Schema Information
#
# Table name: roaster_profiles
#
#  id         :bigint(8)        not null, primary key
#  about      :text
#  address_1  :string
#  address_2  :string
#  city       :string
#  facebook   :string
#  location   :string
#  name       :string
#  slug       :string
#  state      :string
#  subdomain  :string
#  twitter    :string
#  url        :string
#  zip_code   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#

class RoasterProfile < ApplicationRecord
  include Rails.application.routes.url_helpers
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :users
  has_many :wallets
  has_many :transactions
  has_many :lots
  has_many :crops, through: :lots
  has_many :batches, through: :lots
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :products
  has_many :wholesale_profiles
  has_many :orders, through: :wholesale_profiles
  has_many :customer_profiles, through: :wholesale_profiles

  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  has_one_attached :logo

  delegate :subscription, to: :owner
  validates :subdomain,
            exclusion: { in: %w(www),
            message: "%{value} is reserved." },
            presence: true,
            uniqueness: true

  before_validation :sanitize_subdomain
  before_save :set_subdomain, if: :new_record?

  def bags_delivered(lot_id)
    self.transactions.collect{ |t| t.quantity.to_i if t.lot_id == lot_id }.sum
  end

  def bags_remaining(producer_id, lot_id)
    producer = ProducerProfile.find(producer_id)
    lot = Lot.find(lot_id)
    bags_remaining = lot.bags - self.bags_delivered(lot_id)
  end

  def amount_roasted_in_period(subscription_id)
    subscription = Subscription.find(subscription_id)
    date_range = (subscription.next_bill_date - 30.days)..subscription.next_bill_date.end_of_day - 1.days
    batches = self.batches.where(roast_date: date_range)
    pounds_roasted_in_period = batches.pluck(:starting_amount).sum
  end

  def set_owner
    if self.owner.nil?
      owner = self.users.first
      self.update(owner: owner)
    end
  end

  def logo_image_url
    if logo.nil?
      url_for(logo)
    end
  end

  private

  def sanitize_subdomain
    self.subdomain = self.subdomain.parameterize
  end

  def set_subdomain
    self.subdomain = self.name.parameterize
  end

end
