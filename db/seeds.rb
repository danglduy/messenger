# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.where(email: "user@domain.com")
            .first_or_create(password: "12345678")

user2 = User.where(email: "user2@domain.com")
            .first_or_create(password: "12345678")

channel1 = Channel.where(name: "channel_1").first_or_create
channel1.users = [user1, user2]
channel1.save!

