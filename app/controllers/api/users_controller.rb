module Api
  class UsersController < ApiController
    def index
      users = User.all

      render json: {
        data: users.as_json(only: [:id, :name, :email])
      }
    end
  end
end
