class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  private

  def authenticate_user!
    redirect_to login_path unless user_signed_in?
  end

  def user_signed_in?
    current_user.present?
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  helper_method :current_user
end
