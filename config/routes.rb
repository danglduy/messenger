Rails.application.routes.draw do
  root 'home#index'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  namespace :api do
    resources :channels, only: [:index] do
      resources :messages, only: [:index, :create]
    end

    resources :users, only: [:index]
  end
end
