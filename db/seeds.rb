# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
u = User.create!(name: "Cafe au Chain Admin", email: "support@cafeauchain.com", password: 'changeme', password_confirmation: 'changeme', admin: true)
puts "#{u.name} created."
p1 = Plan.create!(stripe_plan_id: "plan_E8GqFxcQDJTsvk",
  price_in_cents: 200,
  interval: "monthly",
  name: "Proof of Perk Usage")
p2 = Plan.create!(stripe_plan_id: "plan_E8GnBNhnJAYQm8",
  price_in_cents: 1999,
  interval: "monthly",
  name: "Proof of Perk Base")

u2 = User.create!(name: '1000 Faces User', email: 'jordan@cafeauchain.com', password: 'changeme', password_confirmation: 'changeme', admin: false)
puts "#{u2.name} created."
roaster = RoasterProfile.create(name: "1000 Faces Coffee", url: '1000facescoffee.com', address_1: "510 N Thomas St", zip_code: "30601", city: "Athens", state: "GA", about: "OUR MISSION IS TO CONNECT THE COFFEE CONSUMER AND COFFEE PRODUCER MORE DIRECTLY THROUGH QUALITY, EDUCATION, SERVICE, AND FRIENDLY INTERACTIONS. \n1000 Faces envisions more consumers being mindful about their coffee consumption and through increased demand, spurring more quality coffee production. 1000 Faces is a coffee roaster, merchant of change, and voyager ofthe agrarian spirit. We are a group of folks who are passionate about coffee and passionate about being nice to people. We travel to countries of origin and establish relationships with producers to ensure the integrity of our coffee. Since we opened our doors on day one, we have been working in partnership with the two most important ends of the 1000 Faces spectrum: the grower and the customer. It is this partnership that is at the foundation for real economic sustainability for not just us, but all parties involved. We believe that respect forgeographic origin, direct relationships, and ecological awareness is the basis for creating a more sustainable coffee culture. Building on these principles, from seed to cup, 1000 Faces has set out to bring forth coffees of unsurpassed integrity and quality.")
puts "#{roaster.name} created."
roaster.users << u2
roaster.set_owner
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
lot = roaster.lots.create(harvest_year: "2018", pounds_of_coffee: 1760.0, price_per_pound: 3.26, crop: crops[0])
LedgerServices::AssetIssueTransaction.new(1760.0, crops[0].id, roaster.id).call
puts "Lot created."
LedgerServices::AssetTransferTransaction.new(440.0, lot.id, roaster.id).call
LedgerServices::AssetDeliveryTransaction.new(440.0, lot.id, roaster.id).call

batch = lot.batches.create(starting_amount: 176.0, ending_amount: 158.4)
LedgerServices::RoastTransaction.new(176.0, batch.id, roaster.id).call
puts "Batch created."   