class User < ApplicationRecord
  has_secure_password

  has_many :participations, dependent: :destroy
  has_many :channels, through: :participations

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
