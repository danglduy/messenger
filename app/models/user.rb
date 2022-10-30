class User < ApplicationRecord
  has_secure_password

  has_many :participations, dependent: :destroy
  has_many :channels, through: :participations
end
