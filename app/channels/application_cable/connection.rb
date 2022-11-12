module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      authenticate_user!
    end

    private

    def authenticate_user!
      reject_unauthorized_connection unless user_signed_in?
    end

    def user_signed_in?
      current_user.present?
    end

    def current_user
      @current_user ||= User.find_by(id: request.session['user_id'])
    end
  end
end
