class Channel < ApplicationRecord
  has_many :participations, dependent: :destroy
  has_many :users, through: :participations

  enum channel_type: {
    group: 0,
    direct: 1,
  }
end
