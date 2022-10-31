module Api
  class MessagesController < ApiController
    def index
      channel = find_channel

      render json: {
        data: channel.messages.includes(:user)
                              .as_json(include: { user: { only: [:id, :name, :email] } }),
      }
    end

    def create
      channel = find_channel
      message = channel.messages.new(messages_params.merge(user: current_user))

      if message.save
        render json: {
          data: message.as_json(include: { user: { only: [:id, :name, :email] } }),
        }
      end
    end

    private

    def find_channel
      Channel.joins(:participations)
             .where(participations: {user_id: current_user.id})
             .find(params[:channel_id])
    end

    def messages_params
      params.permit(:content)
    end
  end
end
