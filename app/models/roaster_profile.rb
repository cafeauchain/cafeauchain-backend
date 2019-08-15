# == Schema Information
#
# Table name: roaster_profiles
#
#  id                :bigint(8)        not null, primary key
#  about             :text
#  address_1         :string
#  address_2         :string
#  city              :string
#  facebook          :string
#  location          :string
#  name              :string
#  onboard_status    :integer
#  slug              :string
#  state             :string
#  subdomain         :string
#  twitter           :string
#  url               :string
#  wholesale_status  :integer
#  zip_code          :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  owner_id          :integer
#  stripe_account_id :string
#
# Indexes
#
#  index_roaster_profiles_on_owner_id  (owner_id)
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
  has_many :inventory_items, through: :lots
  has_many :batches, through: :inventory_items
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :products
  has_many :wholesale_profiles
  has_many :orders, through: :wholesale_profiles
  has_many :customer_profiles, through: :wholesale_profiles
  has_many :shipping_methods

  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  has_one_attached :logo

  delegate :subscription, to: :owner

  enum onboard_status: [:profile, :lots, :"roast_profiles", :"wholesale_details", :"wholesale_signup", :shipping, :products, :onboard_completed]
  enum wholesale_status: [:not_enrolled, :started, :enrolled]

  validates :subdomain,
            exclusion: { in: %w(www),
            message: "%{value} is reserved." },
            presence: true,
            uniqueness: true

  before_validation :sanitize_subdomain
  before_save :set_subdomain, if: :new_record?
  
  has_one :cutoff

  def open_lots
    self.lots.where.not(status: :roasted_in_full)
  end

  def open_order_items
    items = self.orders.where(status: :processing).collect do |o|
      o.order_items.map do |oi|
        {
          size: oi.product_variant.custom_options["size"],
          customer: oi.order.customer_profile.company_name,
          quantity: oi.quantity,
          product: oi.product_variant.product.title,
          options: oi.product_options[0],
          order: oi.order.id,
          id: oi.id,
          packed: oi.packed
        }
      end
    end
    items.flatten
  end

  def primary_address
    self.addresses.find_by(primary_location: true)
  end

  def bags_delivered(lot_id)
    self.transactions.collect{ |t| t.quantity.to_i if t.lot_id == lot_id }.sum
  end

  def bags_remaining(producer_id, lot_id)
    lot = Lot.find(lot_id)
    lot.bags - self.bags_delivered(lot_id)
  end

  def amount_roasted_in_period(subscription_id)
    subscription = Subscription.find(subscription_id)
    date_range = subscription.period_start..subscription.period_end
    batches = self.batches.where(roast_date: date_range, status: :roast_completed)
    batches.pluck(:starting_amount).map{|sa| sa.to_f || 0}.sum
  end

  def set_owner
    if self.owner.nil?
      owner = self.users.first
      self.update(owner: owner)
    end
  end

  def logo_image_url
    if logo.attached?
      Rails.application.routes.url_helpers.rails_blob_path(logo, only_path: true)
    end
  end

  def getOpenOrderAmounts
    orders = self.orders.where(status: :processing)
    InventoryServices::GetAmountsNeeded.process(orders)
  end

  def getOpenOrderAmountsByDate
    orders = self.orders.where(status: :processing)
    InventoryServices::GetAmountsNeeded.process(orders, true)
  end

  private

  def sanitize_subdomain
    self.subdomain = self.subdomain.parameterize
  end

  def set_subdomain
    self.subdomain = self.name.parameterize
  end

end
