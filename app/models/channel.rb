class Channel < ApplicationRecord
  has_many :participations, dependent: :destroy
  has_many :users, through: :participations

  enum channel_type: {
    group: 0,
    direct: 1,
  }, _prefix: true

  validate :validate_group_channel_name

  private

  def validate_group_channel_name
    errors.add(:name, :blank) if channel_type_group? && name.blank?
  end
end
