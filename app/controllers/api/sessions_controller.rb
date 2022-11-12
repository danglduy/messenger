module Api
  class SessionsController < ApiController
    def destroy
      logout

      head :no_content
    end

    private

    def logout
      session.delete(:user_id)
    end
  end
end
