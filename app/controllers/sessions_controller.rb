class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create]

  def new
    redirect_to root_path if user_signed_in?
  end

  def create
    user = User.find_by(email: params[:user][:email])

    if user&.authenticate(params[:user][:password])
      login_user(user)

      # FIXME: replace the status. For now this is necessary to make redirecting work.
      redirect_to root_path, status: :unprocessable_entity
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    logout
    redirect_to login_path
  end

  private

  def login_user(user)
    session[:user_id] = user.id
  end

  def logout
    session.delete(:user_id)
  end
end
