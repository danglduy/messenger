Rails.application.routes.draw do
  root 'home#index'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  namespace :api do
    resources :users, only: [:index]
  end
end
