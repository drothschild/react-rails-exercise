# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#  Brands

 brands = Brand.create([{name: 'Ford'}, {name: 'General Electric'}, {name: 'Kellog'}, {name: 'Disney'} ])

 # Products

 20.times do 
    Product.create({name: Faker::Science.element, 
    brand: brands.sample, description: Faker::HitchhikersGuideToTheGalaxy.quote,price: Faker::Number.between(1, 100)  }
      )
 end