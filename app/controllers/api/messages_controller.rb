module Api
  class MessagesController < ApiController
    def index
      channel = Channel.joins(:participations)
                       .where(participations: {user_id: current_user.id})
                       .find(params[:channel_id])

      render json: {
        data: channel.messages.includes(:user)
                              .as_json(include: { user: { only: [:id, :name, :email] } }),
      }
    end
  end
end
