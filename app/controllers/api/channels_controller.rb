module Api
  class ChannelsController < ApiController
    def index
      channels = Channel.joins(:participations)
                        .where(participations: {user_id: current_user.id})

      render json: {
        data: channels.as_json(only: [:id, :name, :channel_type]),
        direct_channels_user_ids: get_participant_ids(channels.channel_type_direct) || {}
      }
    end

    def create
      channel = Channel.new(channel_params.merge(user_ids: [current_user.id, params[:user_id]]))

      if channel.channel_type_direct?
        existing_direct_channel = current_user.direct_channel_with(User.find(params[:user_id]))

        if existing_direct_channel
          render json: {
            data: existing_direct_channel.as_json(only: [:id, :name, :channel_type]),
          }
        elsif channel.save
          render json: {
            data: channel.as_json(only: [:id, :name, :channel_type]),
          }
        end
      end
    end

    private

    def channel_params
      params.permit(:channel_type)
    end

    def get_participant_ids(channels)
      direct_channels_and_user_ids = channels.channel_type_direct.map do |channel|
        { channel.id => channel.participations.pluck(:user_id) }
      end

      # Sample output: {2=>[3, 4], 3=>[3, 4, 5]}
      # The hash's keys are channel ids and the values are the channels' participants' ids.
      direct_channels_and_user_ids.inject(:merge!)
    end
  end
end
