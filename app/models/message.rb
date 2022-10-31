class Message < ApplicationRecord
  belongs_to :channel
  belongs_to :user

  validates :content, presence: true

  after_create :board_cast_message

  private

  def board_cast_message
    ActionCable.server.broadcast(
      "messages_channel_#{channel.id}",
      { type: "ADD_MESSAGE",
        payload: as_json(include: { user: { only: [:id, :name, :email] } }) }
    )
  end
end
