require 'stripe'
Stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

u = User.create!(name: "Cafe au Chain Admin", email: "support@cafeauchain.com", password: 'changeme', password_confirmation: 'changeme', admin: true)
puts "#{u.name} created."

p1 = Plan.create!(stripe_plan_id: "plan_EW9GjmwuQpIKq7",
  price_in_cents: 200,
  interval: "monthly",
  name: "Proof of Perk Usage")
p2 = Plan.create!(stripe_plan_id: "plan_EW5n1MwhCcYy5r",
  price_in_cents: 1999,
  interval: "monthly",
  name: "Proof of Perk Base")
p3 = Plan.create!(stripe_plan_id: 'plan_EdJPS9KT8YVr8b',
  price_in_cents: 999,
  interval: "monthly",
  name: 'Proof of Perk Wholesale Lite'
)

u2 = User.create!(name: 'Arthur Pendragon', email: 'pendragondevelopment@gmail.com', password: 'changeme', password_confirmation: 'changeme', admin: false)
puts "#{u2.name} created."
roaster = RoasterProfile.create(name: "Pendragon Coffee", subdomain: 'pendragon-coffee', url: 'pendragoncoffee.com', about: "Good coffee, round table.", onboard_status: :lots, wholesale_status: 'not_enrolled')
puts "#{roaster.name} created."
roaster.users << u2
roaster.set_owner
roaster.addresses.create(street_1: "345 W Hancock Ave", street_2: "Suite 108", postal_code: "30601", city: "Athens", state: "GA", primary_location: true, location_label: "Main Office", country: "United States of America")
sub = StripeServices::EnrollBaseSubscription.initial_enroll(u2.id)
token = Stripe::Token.create(
  card: {
    number: "4242424242424242",
    exp_month: 2,
    exp_year: 2020,
    cvc: "314",
  },
)
card = StripeServices::CreateCard.call(sub.id, nil, token, true)
producer = ProducerProfile.create(name: "Gold Mountain Coffee Growers")
puts "#{producer.name} created."
crops = []
crop_data = [
  ["Finca Idealista Rainforest Natural", "Nicaragua", "Finca Idealista", "1000-1450 masl", "natural", "pacamara"],
  ["Finca Idealista Rainforest Honey", "Nicaragua", "Finca Idealista", "1000-1450 masl", "honey", "pacamara"],
  ["Finca Idealista Rainforest Pacas", "Nicaragua", "Finca Idealista", "1000-1450 masl", "honey", "pacas" ],
  ["Finca Idealista Rainforest Caturra", "Nicaragua", "Finca Idealista", "1000-1450 masl", "honey", "caturra"],
  ["Don Roger's Tropical Fruit Symphony", "Nicaragua", "Finca Idealista", "1000-1450 masl", "natural", "caturra"]
]
crop_data.each do |crop|
  crops << producer.crops.create(name: crop[0], country: crop[1], region: crop[2], altitude: crop[3], process: crop[4], varietal: crop[5])
end
puts "Crops created."
lot = roaster.lots.create(harvest_year: "2018", pounds_of_coffee: 1760.0, price_per_pound: 3.26, crop: crops[0], name: "Finca Idealista", label: "FIRN2018", low_on_hand: 50, low_remaining: 250)
LedgerServices::AssetIssueTransaction.new(1760.0, crops[0].id, roaster.id).call
puts "Lot created."
LedgerServices::AssetTransferTransaction.new(1760.0, lot.id, roaster.id).call
LedgerServices::AssetDeliveryTransaction.new(440.0, lot.id, roaster.id).call

inventory_item = lot.inventory_items.create(name: 'City Roast', quantity: 0.0, par_level: 100.0)
product = roaster.products.create(title: 'Finca Idealista City', status: 'live', description: "This is the best coffee you've ever had.", product_options: ["whole bean", "ground"])
product_variant = product.product_variants.create(price_in_cents: 899, quantity: 0, variant_title: '12oz Whole Bean', custom_options: {size: '12'}, production_options: [:whole_bean, :medium_ground])
ProductInventoryItem.create(product: product, inventory_item: inventory_item, percentage_of_product: 100.0)
puts "Product created."
batch = lot.batches.create(starting_amount: 176.0, ending_amount: 158.4, roast_date: "2019-01-31", status: 2, inventory_item: inventory_item)
inventory_item.update(quantity: 128.4)
product_variant.update(quantity: 40)
LedgerServices::RoastTransaction.new(176.0, batch.id, roaster.id).call
puts "Batch created."
