Rails.application.routes.draw do
  root 'home#index'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  namespace :api do
    resources :channels, only: [:index, :create] do
      resources :messages, only: [:index, :create]
    end

    resources :users, only: [:index] do
      collection do
        get :me
      end
    end

    delete :logout, to: 'sessions#destroy'
  end
end
