class User < ApplicationRecord
  has_secure_password

  has_many :participations, dependent: :destroy
  has_many :channels, through: :participations

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  def direct_channel_with(user)
    channel = self.channels.channel_type_direct.find do |channel|
      channel.participations.pluck(:user_id).include?(user.id)
    end

    return channel if channel.present?
  end
end
