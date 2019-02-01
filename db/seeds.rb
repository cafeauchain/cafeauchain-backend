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

