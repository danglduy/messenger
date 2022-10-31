module Api
  class ChannelsController < ApiController
    def index
      channels = Channel.joins(:participations)
                        .where(participations: {user_id: current_user.id})

      render json: {
        data: channels.as_json(only: [:id, :name, :channel_type]),
      }
    end
  end
end
