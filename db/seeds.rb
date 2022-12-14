# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user1 = User.where(email: "user@domain.com")
            .first_or_create(name: "User 1", password: "12345678")

user2 = User.where(email: "user2@domain.com")
            .first_or_create(name: "User 2", password: "12345678")

user3 = User.where(email: "user3@domain.com")
            .first_or_create(name: "User 3", password: "12345678")

channel1 = Channel.where(name: "Channel 1").first_or_create
channel1.users = [user1, user2]
channel1.save!

channel2 = Channel.where(name: "Channel 2").first_or_create
channel2.users = [user1, user2, user3]
channel2.save!

Message.where(channel: channel1, user: user1)
                 .first_or_create(content: "First message")
Message.where(channel: channel1, user: user2)
                 .first_or_create(content: "Second message")

Message.where(channel: channel2, user: user1)
                 .first_or_create(content: "First message 2")
Message.where(channel: channel2, user: user2)
                 .first_or_create(content: "Second message 2")
Message.where(channel: channel2, user: user3)
                 .first_or_create(content: "Third message 2")
